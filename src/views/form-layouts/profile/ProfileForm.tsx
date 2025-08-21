import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFetchUpdateMember } from "src/hooks/mutation/useFetchUpdateMember";
import { IMemberUpdateType, genders } from "src/type/type";
import { toastSucMsg } from "src/utils/toast/toast";
import { useAuthStore } from "src/zustand/AuthUserInfo";
  

interface IProfileFormProps {
  formId: string;
  profile?: any;
}

const ProfileForm = ({ formId,profile }: IProfileFormProps) => {
  const [changePwdFlg,setChangePwdFlg] = useState<boolean>(false);
  const authUserInfo = useAuthStore((state) => state.authUserInfo);
  
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    reset,
  } = useForm<IMemberUpdateType>({ mode: 'onBlur',
    defaultValues:{
      gender:"default",
      name:"",
      tel:"",
      pwd:""
    }
  });

  const onUpdateMemberSuccess = ()=>{
  toastSucMsg("업데이트 완료하였습니다.");
  setChangePwdFlg(false);
  };

  const updateMember = useFetchUpdateMember(onUpdateMemberSuccess);  

  const onValid = (data:any)=>{
  updateMember.mutate({memberNo:authUserInfo.memberNo,data:data});
  }

  useEffect(() => {
      if (profile) {
          reset({
          tel: profile.tel,
          name: profile.name,
          gender: profile.gender,
          });
      }
  }, [profile, reset]);
  return (
      <Box component="form" id={formId} onSubmit={handleSubmit(onValid)}>
          <Controller 
            name="name"
            control={control}
            rules={{
              required: "이름(아이디)을 입력해주세요.",
              pattern: {
                  value: /^([가-힣]+|[a-zA-Z]+)$/,
                  message: "한글 또는 영어로만 입력해주세요.(혼용 X)"
              },
            }}
            render={({field})=>(
              <TextField
                {...field}
                InputLabelProps={{ shrink: true }}
                id="default-value"
                label="이름"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              error={!!errors.name}
              helperText={errors.name?.message}
              />
            )}
          />

          <TextField
            id="email-text"
            defaultValue={authUserInfo.email}
            label="Email"
            autoComplete="email"
            InputLabelProps={{ shrink: true }}
            type="email"
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          
          {
            changePwdFlg 
            ? 
            <>
              <Controller 
                name="pwd"
                control={control}
                render={({field})=>(
                    <TextField
                      {...field}
                      id="outlined-password-input"
                      label="New Password"
                      type="password"
                      autoComplete="current-password"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                )}
              />

              <Controller 
                name="pwdConfirm"
                rules={{
                  validate: {
                    passwordConfirm: (value) => {
                        return value === getValues("pwd") || "비밀번호가 일치하지 않습니다.";
                    }
                  }
                }}
                control={control}
                render={({field})=>(
                  <TextField
                    {...field}
                    id="outlined-password-confirm-input"
                    label="PasswordConfirm"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.pwdConfirm}
                    helperText={errors.pwdConfirm?.message}
                  />
                )}
              />
            </>
            :
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              defaultValue={1234567}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="small"
                      sx={{ ml: 1, whiteSpace: "nowrap" }}
                      onClick={()=>setChangePwdFlg(true)}
                    >
                      비밀번호 변경
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

          }


          <Controller
            name="tel"
            control={control}
            rules={{
              required: "휴대폰 번호를 입력해주세요.",
              pattern: {
                  value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                  message: "휴대폰 번호를 확인해주세요."
              }
            }}
            render={({field})=>(
            <TextField
              id="readonly-tel"
              label="Tel"
              {...field}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              // error={!!errors.tel}
              // helperText={errors.tel?.message}
            />
            )}
          />

          <Controller
            name="gender"
            control={control}
            defaultValue="default"
            rules={{
              required: "성별을 선택해주세요",
              pattern: {
                value: /^[FE]{0,}MALE$/,
                message: "성별을 선택해주세요."
              }
            }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.gender}>
                <InputLabel shrink>성별</InputLabel>
                <Select
                  label="성별"
                  {...field}
                  displayEmpty
                  sx={{ mb: 2, width: "100%" }}
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Box>
  );
};

export default ProfileForm;
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
import { useFetchGetMember } from "src/hooks/query/useFetchGetMember";
import { IMemberUpdateType } from "src/type/type";
import { toastSucMsg } from "src/utils/toast/toast";
import { useAuthStore } from "src/zustand/AuthUserInfo";
import BaseCard from "../../../components/BaseCard/BaseCard";
import FullscreenLoader from "src/components/shared/FullScreenLoader";
const genders = [
  {
    value:"default",
    label:"성별을 선택해주세요.",
    disabled:true
  },
  {
    value: "MALE",
    label: "남성",
    
  },
  {
    value: "FEMALE",
    label: "여성",
  },
];

const FbDefaultForm = () => {
  console.log("FbDefaultForm 랜더링");

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

  //onSuccess로 초기값 설정하자니 캐시 타임 때문에 무조건 랜더링마다 api 요청하는 게 아니라서 onSuccess 후처리 작동 X
  // const onSuccess = (data:any) =>{
    // reset({
    //   tel: data.data.tel,
    //   name: data.data.name,
    //   gender:data.data.gender
    // });
  // }
  const getMember = useFetchGetMember(authUserInfo.memberNo);


  const onUpdateMemberSuccess = ()=>{
    toastSucMsg("업데이트 완료하였습니다.");
    setChangePwdFlg(false);
  };
  const updateMember = useFetchUpdateMember(onUpdateMemberSuccess);

  useEffect(() => {
    if (getMember.data) {
      // setValue("gender",getMember.data.data.gender);
      // setValue("tel",getMember.data.data.tel);
      // setValue("name",getMember.data.data.name);

      reset({
        tel: getMember.data.data.tel,
        name: getMember.data.data.name,
        gender: getMember.data.data.gender,
      });
    }
  }, [getMember.data]);

  const onValid = (data:any)=>{
    console.log(data);  
    updateMember.mutate({memberNo:authUserInfo.memberNo,data:data});
  }

  return (
    <div>
      <BaseCard title="My Profile">
        <Box component="form" onSubmit={handleSubmit(onValid)}>
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
                label="name(id)"
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
            // rules={{
            //   required: "휴대폰 번호를 입력해주세요.",
            //   pattern: {
            //       value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
            //       message: "휴대폰 번호를 확인해주세요."
            //   }
            // }}
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

          <div>
            <Button type="submit" color="primary" variant="contained">
              수정
            </Button>
          </div>
        </Box>
      </BaseCard>
      {(getMember.isLoading || updateMember.isLoading) && (
        <FullscreenLoader />
      )}
    </div>
  );
};

export default FbDefaultForm;

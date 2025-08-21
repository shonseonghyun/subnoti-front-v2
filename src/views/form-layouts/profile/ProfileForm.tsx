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
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useFetchUpdateMember } from "src/hooks/mutation/useFetchUpdateMember";
import { IMemberUpdateType, genders } from "src/type/type";
import { toastSucMsg } from "src/utils/toast/toast";
import { useAuthStore } from "src/zustand/AuthUserInfo";
  

interface IProfileFormProps {
  formId: string;
  profile?: any;
}

/* ✅ Validation 규칙 분리 */
const validationRules = {
  name: {
    required: "이름(아이디)을 입력해주세요.",
    pattern: {
      value: /^([가-힣]+|[a-zA-Z]+)$/,
      message: "한글 또는 영어로만 입력해주세요.(혼용 X)",
    },
  },
  tel: {
    required: "휴대폰 번호를 입력해주세요.",
    pattern: {
      value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
      message: "휴대폰 번호를 확인해주세요.",
    },
  },
  gender: {
    required: "성별을 선택해주세요",
    pattern: {
      value: /^[FE]{0,}MALE$/,
      message: "성별을 선택해주세요.",
    },
  },
};

/* ✅ 비밀번호 관련 입력 UI 분리 */
const PasswordFields = ({
  changePwdFlg,
  control,
  errors,
  getValues,
  onChangePwd,
}: any) => {
  if (changePwdFlg) {
    return (
      <>
        <Controller
          name="pwd"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="New Password"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
        />
        <Controller
          name="pwdConfirm"
          control={control}
          rules={{
            validate: (value) =>
              value === getValues("pwd") || "비밀번호가 일치하지 않습니다.",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="PasswordConfirm"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.pwdConfirm}
              helperText={errors.pwdConfirm?.message}
            />
          )}
        />
      </>
    );
  }

  return (
    <TextField
      label="Password"
      type="password"
      defaultValue="******"
      fullWidth
      sx={{ mb: 2 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={onChangePwd}
            >
              비밀번호 변경
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

const ProfileForm = ({ formId, profile }: IProfileFormProps) => {
  const [changePwdFlg, setChangePwdFlg] = useState(false);
  const authUserInfo = useAuthStore((state) => state.authUserInfo);

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    reset,
    setFocus
  } = useForm<IMemberUpdateType>({
    mode: "onBlur",
    shouldFocusError: true,   // ✅ 첫 에러로 자동 포커스
    defaultValues: {
      gender: "default",
      name: "",
      tel: "",
      pwd: "",
    },
  });

  /* ✅ mutation 성공 처리 */
  const onUpdateMemberSuccess = () => {
    toastSucMsg("업데이트 완료하였습니다.");
    setChangePwdFlg(false);
  };

  const updateMember = useFetchUpdateMember(onUpdateMemberSuccess);

  const onValid = (data: any) => {
    updateMember.mutate({ memberNo: authUserInfo.memberNo, data });
  };

  const onInvalid = (errors: FieldErrors<IMemberUpdateType>) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof IMemberUpdateType;
    // const firstError = errors[firstErrorKey];
  
    // if (firstError?.message) {
    //   toastFailMsg(firstError.message);
    // }
  
    if (firstErrorKey) {
      console.log(firstErrorKey);
      setFocus(firstErrorKey);
    }
  };

  /* ✅ profile이 바뀔 때만 reset */
  useEffect(() => {
    if (profile) {
      reset({
        tel: profile.tel || "",
        name: profile.name || "",
        gender: profile.gender || "default",
      });
    }
  }, [profile, reset]);

  return (
    <Box
      component="form"
      id={formId}
      onSubmit={handleSubmit(onValid,onInvalid)}
    >
      {/* 이름 */}
      <Controller
        name="name"
        control={control}
        rules={validationRules.name}
        render={({ field }) => (
          <TextField
            {...field}
            InputLabelProps={{ shrink: true }}
            label="이름"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      {/* 이메일 (readonly) */}
      <TextField
        label="Email"
        defaultValue={authUserInfo.email}
        autoComplete="email"
        InputLabelProps={{ shrink: true }}
        type="email"
        InputProps={{ readOnly: true }}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* 비밀번호 (조건부 UI) */}
      <PasswordFields
        changePwdFlg={changePwdFlg}
        control={control}
        errors={errors}
        getValues={getValues}
        onChangePwd={() => setChangePwdFlg(true)}
      />

      {/* 휴대폰 번호 */}
      <Controller
        name="tel"
        control={control}
        rules={validationRules.tel}
        render={({ field }) => (
          <TextField
            {...field}
            label="Tel"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.tel}
            helperText={errors.tel?.message}
          />
        )}
      />

      {/* 성별 */}
      <Controller
        name="gender"
        control={control}
        rules={validationRules.gender}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.gender}>
            <InputLabel shrink>성별</InputLabel>
            <Select {...field} displayEmpty sx={{ mb: 2, width: "100%" }}>
              {genders.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
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
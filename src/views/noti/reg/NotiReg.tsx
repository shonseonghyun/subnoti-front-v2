import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useFetchGetPlabMatch } from 'src/hooks/query/useFetchPlabMatch';
import { INotiRegType } from 'src/type/type';
import { useAuthStore } from 'src/zustand/AuthUserInfo';

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useFetchGetEnum } from 'src/hooks/query/useFetchGetEnum';
import { toastFail, toastFailMsg, toastSucMsg } from 'src/utils/toast/toast';
import { useFetchRegSubNoti } from 'src/hooks/mutation/useFetchRegSubNoti';

const NotiReg = () => {
  const authUserInfo = useAuthStore((state) => state.authUserInfo);
  console.log("NotiReg 랜더링");

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    getValues,
    reset,
    setFocus,
    trigger
  } = useForm<INotiRegType>({ mode: 'onChange' });

  
  // 매치 인증 플래그
  const [isMathcNoAvailable, setIsMathcNoAvailable] = useState(false);
  
  //============================ useFetchGetEnum =======================================//
  const getSubTypeEnum = useFetchGetEnum('subType');
  //============================ useFetchGetEnum =======================================//


  //============================ useRegFetchSubNoti =======================================//
  const queryClient = useQueryClient();
  const onRegSubNotiSuccess = () => {
    toastSucMsg("등록 성공하였습니다.");
    reset();
    setIsMathcNoAvailable(false);

    // 리스트를 invalidate 시키지만 refetch 시킴
    queryClient.invalidateQueries(['noti'], { refetchInactive: true });
  };
  const regSubNotiMutation = useFetchRegSubNoti(onRegSubNotiSuccess);
  //============================ useRegFetchSubNoti =======================================//


  //============================ useGetPlabMatch =======================================//
  const onGetPlabMatchSuccess = ()=>{
    toastSucMsg("매치번호 인증 완료하였습니다.");
    setIsMathcNoAvailable(true);
  }

  const onGetPlabMatchError = (error:any)=>{
    if(error.response.data){
      toastFailMsg("존재하지 않는 매치번호입니다.");
      return ;
    }
    toastFail(error);
  }

  const getPlabMatch = useFetchGetPlabMatch(getValues('matchNo'),onGetPlabMatchSuccess,onGetPlabMatchError);
  //============================ useGetPlabMatch =======================================//


  const onValid = (data: INotiRegType) => {
    if (isMathcNoAvailable) {
      regSubNotiMutation.mutate(data);
    }
  };

  const clickedResetBtn = () => {
    resetField('matchNo');
    setFocus('matchNo');
    if(isMathcNoAvailable==true){
      setIsMathcNoAvailable(false);
    }
  };


  const clickedValidBtn = async () => {
    // const isValid = trigger("matchNo"); // 유효성 검증 수동 실행, 비동기 처리이므로 await 붙이지 않아 바로 다음줄로 넘어감, isValid는 항상 같은 값
    const isValid = await trigger("matchNo"); //유효성 검증 수동 실행
    const matchNo = getValues("matchNo");
    if(!matchNo){
      toastFailMsg("매치 번호를 입력해주세요.");
      return ;
    }

    if(!isValid){
      reset();
      toastFailMsg(errors?.matchNo?.message!);
      return ;
    }

    await getPlabMatch.refetch();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        알림 등록
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onValid)} noValidate>
        <input type="hidden" {...register('email')} value={authUserInfo.email} />
        <input type="hidden" {...register('memberNo')} value={authUserInfo.memberNo} />

        <FormControl fullWidth margin="normal">
          <TextField
            label="매치 번호"
            placeholder="매치번호를 입력하세요."
            {...register('matchNo', {
              required: '매치번호를 입력해주세요.',
              pattern: {
                value: /^\d+$/,
                message: '숫자만 입력해주세요.'
              }
            })}
            error={!!errors.matchNo}
            helperText={errors.matchNo?.message}
            InputProps={{ readOnly: isMathcNoAvailable }}
          />
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              onClick={clickedValidBtn}
              disabled={isMathcNoAvailable}
            >
              인증
            </Button>
            <Button variant="outlined" color="error" onClick={clickedResetBtn}>
              초기화
            </Button>
          </Stack>
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.subType}>
          <InputLabel>서브 타입</InputLabel>
          <Select
            defaultValue="default"
            label="서브 타입"
            {...register('subType', {
              pattern: {
                value: /^(?!.*default).*$/,
                message: '서브 타입을 선택해주세요.'
              }
            })}
          >
            <MenuItem value="default" disabled>
              프리 서브를 선택해주세요.
            </MenuItem>
            {getSubTypeEnum.data &&
              getSubTypeEnum.data.data.map((item: any) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.desc}
                </MenuItem>
              ))}
          </Select>
          {errors.subType && (
            <FormHelperText>{errors.subType.message}</FormHelperText>
          )}
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={regSubNotiMutation.isLoading || !isMathcNoAvailable}
          sx={{ mt: 3 }}
        >
          등록
        </Button>
      </Box>

      {(getPlabMatch.isLoading || regSubNotiMutation.isLoading) && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default NotiReg;
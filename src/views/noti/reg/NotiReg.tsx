import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useFetchGetPlabMatch } from 'src/hooks/query/useFetchPlabMatch';
import { INotiRegType } from 'src/type/type';
import { useAuthStore } from 'src/zustand/AuthUserInfo';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import FullscreenLoader from 'src/components/shared/FullScreenLoader';
import { useFetchRegSubNoti } from 'src/hooks/mutation/useFetchRegSubNoti';
import { useFetchGetEnum } from 'src/hooks/query/useFetchGetEnum';
import { toastFail, toastFailMsg, toastSucMsg } from 'src/utils/toast/toast';

interface INotiRegProps {
  doPostProcessOfRegSubNoti: () => void;
};

const NotiReg = ({doPostProcessOfRegSubNoti}:INotiRegProps) => {
  const authUserInfo = useAuthStore((state) => state.authUserInfo);
  console.log("NotiReg 랜더링");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    control,
    setFocus,
    trigger
  } = useForm<INotiRegType>({ mode: 'onChange'});
  
  const focusMatchNo = () => {
    setTimeout(() => { //헤딩 컴포넌트가 다시 렌더링되고 마운트가 완료된 뒤에 실행되는 비동기 코드로 안전하게 포커스를 줄 수 있게 해주는 트릭입니다.
      setFocus("matchNo"); // 해당 컴포넌트 마운트 및 렌더링 반영이 끝난 후 실행
    }, 0);
  };

  useEffect(()=>{
    focusMatchNo();
  },[]);
  
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
    doPostProcessOfRegSubNoti();
    queryClient.invalidateQueries(['noti','dates'], { refetchInactive: true });
    focusMatchNo();
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
    reset();
    if(isMathcNoAvailable==true){
      setIsMathcNoAvailable(false);
    }
      // 다음 tick에 포커스 이동
      focusMatchNo();
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
      focusMatchNo();
      return ;
    }

    await getPlabMatch.refetch();
  };

  return (
    <>
    <Box sx={{ p: 1 }}>
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
            autoComplete='off'
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

        {/* <FormControl fullWidth margin="normal" error={!!errors.subType}>
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
        </FormControl> */}
        
        <FormControl fullWidth margin="normal" error={!!errors.subType}>
          <InputLabel>서브 타입</InputLabel>

          <Controller
            name="subType"
            control={control}
            defaultValue="default"
            rules={{
              validate: (value) =>
                value !== "default" || "서브 타입을 선택해주세요.",
            }}
            render={({ field }) => (
              <Select
                {...field}
                label="서브 타입"
              >
                <MenuItem value="default" disabled>
                  프리 서브를 선택해주세요.
                </MenuItem>
                {getSubTypeEnum.data?.data.map((item: any) => (
                  <MenuItem key={item.name} value={item.name}>
                    {item.desc}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.subType && <FormHelperText>{errors.subType.message}</FormHelperText>}
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

    </Box>
      {(getPlabMatch.isLoading || regSubNotiMutation.isLoading) && (
        <FullscreenLoader />
      )}
    </>

  );
};

export default NotiReg;
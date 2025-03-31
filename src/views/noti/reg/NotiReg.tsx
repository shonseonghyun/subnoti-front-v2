import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useFetchGetPlabMatch } from 'src/hooks/useFetchPlabMatch';
import { useRegFetchSubNoti } from 'src/hooks/useRegFetchSubNoti';
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
import { useFetchGetEnum } from 'src/hooks/useFetchGetEnum';

const NotiReg = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    resetField,
    reset,
    setFocus
  } = useForm<INotiRegType>({ mode: 'onChange' });

  const [isMathcNoAvailable, setIsMathcNoAvailable] = useState(false);
  const getPlabMatch = useFetchGetPlabMatch(watch('matchNo'));

  const authUserInfo = useAuthStore((state) => state.authUserInfo);

  const queryClient = useQueryClient();
  const onSuccess = () => {
    toast.success('등록 성공!', { position: 'top-center' });
    reset();
    setIsMathcNoAvailable(false);

    // 리스트를 invalidate 시키지만 refetch 시킴
    queryClient.invalidateQueries(['noti'], { refetchInactive: true });
  };

  const regSubNotiMutation = useRegFetchSubNoti(onSuccess);
  const getSubTypeEnum = useFetchGetEnum('subType');

  const onValid = (data: INotiRegType) => {
    if (isMathcNoAvailable) {
      regSubNotiMutation.mutate(data);
    }
  };

  const clickedResetBtn = () => {
    resetField('matchNo');
    setFocus('matchNo');
    setIsMathcNoAvailable(false);
  };

  const clickedValidBtn = async () => {
    if(errors.matchNo){
      reset();
      return ;
    }

    const response = await getPlabMatch.refetch();
    if ((response.error as AxiosError)?.response?.status === 404) {
      setIsMathcNoAvailable(false);
      return;
    }
    toast.success("매치번호 인증완료하였습니다",{
      position:'top-center',
    });
    setIsMathcNoAvailable(true);
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

import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { useFetchLogin } from 'src/hooks/mutation/useFetchLogin';
import useRememberId from 'src/hooks/useRememberId';
import { ILoignRegType } from 'src/type/type';
import { getCookie } from 'src/utils/cookie';
import { useAuthStore } from 'src/zustand/AuthUserInfo';


const AuthLogin = ()=> {
    const setAuthUserInfo = useAuthStore((state) => state.setAuthUserInfo);
    const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    } = useForm<ILoignRegType>({ mode: 'onSubmit' });
    const [isRememberId, onToggle, checkboxRef, doRememberId, rememberId] = useRememberId(false, getValues);
    const location = useLocation();
    const navigate = useNavigate();
  
    const onSuccess = (data: any) => {
      setAuthUserInfo({
        accessToken: getCookie('accessToken'),
        refreshToken: getCookie('refreshToken'),
        memberId: data.data.memberId,
        email: data.data.email,
        memberNo: data.data.memberNo,
        name: data.data.name
      });
  
      const from = location.state?.redirectedFrom?.pathname || '/';
      navigate(from);
    };
  
    const loginMutation = useFetchLogin(onSuccess);
  
    const onValid = (data: ILoignRegType) => {
      doRememberId();
      loginMutation.mutate(data);
    };
  
    return (
      <>
          <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h1" variant="h5">
                로그인
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onValid)} sx={{ mt: 3 }}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="이메일"
                    variant="outlined"
                    defaultValue={rememberId}
                    {...register('email', {
                      required: '이메일을 입력해주세요.',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@naver.com$/i,
                        message: '이메일 형식을 확인해주세요.',
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="비밀번호"
                    type="password"
                    autoComplete='off'
                    variant="outlined"
                    {...register('pwd', { required: '비밀번호를 입력해주세요.' })}
                    error={!!errors.pwd}
                    helperText={errors.pwd?.message}
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox checked={isRememberId} onChange={onToggle} inputRef={checkboxRef} />}
                  label="이메일 기억"
                />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
                  로그인
                </Button>
              </Box>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Link to="/auth/findme" style={{ textDecoration: 'none', color: 'primary' }}>
                  아이디/비밀번호 찾기
                </Link>
                <Link to="/auth/register" style={{ textDecoration: 'none', color: 'primary' }}>
                  회원가입
                </Link>
              </Box>
            </Box>
          </Container>
      </>
    );
};

export default AuthLogin;
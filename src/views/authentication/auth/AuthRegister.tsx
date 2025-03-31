import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useFetchJoin } from 'src/hooks/useFetchJoin';
import { IMemberRegType } from 'src/type/type';
import { toastSuc } from 'src/utils/toast/toast';

const AuthRegister = ({subtitle}:any) => {
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<IMemberRegType>({ mode: 'onBlur' });
    const onSuccess = () =>{
        toastSuc();
        navigate("/auth/login");
    }
    const joinMutation = useFetchJoin(onSuccess);

    const onValid = (data: IMemberRegType) => {
        joinMutation.mutate(data);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    회원가입
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onValid)} sx={{ mt: 3 }}>
                    <TextField
                        label="이메일"
                        fullWidth
                        margin="normal"
                        {...register("email", {
                            required: "이메일을 입력해주세요.",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@naver.com$/i,
                                message: "이메일 형식을 확인해주세요."
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Button variant="contained">중복검사</Button>
                        <Button variant="contained">이메일 인증</Button>
                    </Stack>
                    <TextField
                        label="비밀번호"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register("pwd", { required: "비밀번호를 입력해주세요." })}
                        error={!!errors.pwd}
                        helperText={errors.pwd?.message}
                    />
                    <TextField
                        label="비밀번호 확인"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register("pwdConfirm", {
                            validate: {
                                passwordConfirm: (value) => {
                                    return value === getValues("pwd") || "비밀번호가 일치하지 않습니다.";
                                }
                            }
                        })}
                        error={!!errors.pwdConfirm}
                        helperText={errors.pwdConfirm?.message}
                    />
                    <TextField
                        label="이름"
                        fullWidth
                        margin="normal"
                        {...register("name", { required: "이름을 입력해주세요." })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.gender}>
                        <InputLabel>성별</InputLabel>
                        {/* <Select
                            defaultValue=""
                            {...register("gender", {
                                required: "성별을 선택해주세요",
                                pattern: {
                                    value: /^[FE]{0,}MALE$/,
                                    message: "성별을 선택해주세요."
                                }
                            })}
                        >
                            <MenuItem value="MALE">남성</MenuItem>
                            <MenuItem value="FEMALE">여성</MenuItem>
                        </Select> */}

                        <Select
                            defaultValue="default"
                            label="서브 타입"
                            {...register("gender", {
                                required: "성별을 선택해주세요",
                                pattern: {
                                    value: /^[FE]{0,}MALE$/,
                                    message: "성별을 선택해주세요."
                                }
                            })}
                        >
                            <MenuItem value="default" disabled>
                                성별을 선택해주세요.
                            </MenuItem>
                            <MenuItem value="MALE">남성</MenuItem>
                            <MenuItem value="FEMALE">여성</MenuItem>
                        </Select>

                        <FormHelperText>{errors.gender?.message}</FormHelperText>
                    </FormControl>
                    <TextField
                        label="휴대폰 번호"
                        fullWidth
                        margin="normal"
                        {...register("tel", {
                            required: "휴대폰 번호를 입력해주세요.",
                            pattern: {
                                value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                                message: "휴대폰 번호를 확인해주세요."
                            }
                        })}
                        error={!!errors.tel}
                        helperText={errors.tel?.message}
                    />
                    <Stack spacing={2} sx={{ mt: 3 }}>
                        <Button variant="contained" type="submit" fullWidth>
                            회원가입
                        </Button>
                    </Stack>
                </Box>
            </Box>
            {subtitle}
        </Container>
    );
};

export default AuthRegister;
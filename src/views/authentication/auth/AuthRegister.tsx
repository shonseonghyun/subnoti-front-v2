import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { UseFormGetFieldState, UseFormGetValues, UseFormTrigger, useForm } from 'react-hook-form';
import { UseQueryResult } from 'react-query';
import { useNavigate } from 'react-router';
import { useFetchJoin } from 'src/hooks/mutation/useFetchJoin';
import { useFetchGetEmailDuplicate } from 'src/hooks/query/useFetchGetEmailDuplicate';
import { IMemberRegType } from 'src/type/type';
import { toastFail, toastFailMsg, toastSuc, toastSucMsg } from 'src/utils/toast/toast';

const checkEmailDuplicate = async (
    getValues: UseFormGetValues<IMemberRegType>,
    getFieldState:UseFormGetFieldState<IMemberRegType>,
    trigger:UseFormTrigger<IMemberRegType>,
    getEmailDuplicate:UseQueryResult<any, unknown>,
    isEmailAvailable: boolean,
    setIsEmailAvailable:React.Dispatch<React.SetStateAction<boolean>>
) =>{
    const isValid = await trigger("email"); //유효성 검사 수동 실행
    const email = getValues("email"); //최신값 확보
    
    // undefined case(랜더링 직후 또는 새로고침 하자마자 중복검사 클릭시 아직 한번도 필드를 건드리지 않아서 onBlur나 onChange 이벤트가 발생하지 않아 검증이 실행되지 않아 errors가 비어있음)
    if (!email || email.trim() === '') {
        console.log("if (!email || email.trim() === '')");
        toastFailMsg('이메일을 입력해주세요.');

        // 아래 두 세팅 메소드는 기존값이 false라도 React는 변경으로 처리할 수 있어 리랜더링 발생시킴
        // setIsEmailAvailable(false); 
        // setIsEmailAvailable(prev=>prev ? false : prev);
        if (isEmailAvailable !== false) {
            setIsEmailAvailable(false);
        }
        return ;
    }

    if(!isValid){
        const {error} = getFieldState("email");
        toastFailMsg(error?.message!);

        // setIsEmailAvailable(false);
        if (isEmailAvailable !== false) {
            setIsEmailAvailable(false);
        }
        return;
    }

    // // useForm email필드 유효성 검증 case
    // if(errors.email?.message){
    //     toastFailMsg(errors.email.message);
    //     setIsEmailAvailable(false);
    //     return false;
    // }

    // 해당 apiHook onSuccess,onError로 후처리 진행
    await getEmailDuplicate.refetch();
}



const AuthRegister = ({subtitle}:any) => {
    console.log("AuthRegister 랜더링");
    
    // 이메일 중복검사 플래그
    const [isEmailAvailable,setIsEmailAvailable] = useState<boolean>(false);
    // 이메일 인증 플래그
// const [isEmailAuthFlg,setIsEmailAuthFlg] = useState<boolean>(false);

    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        getFieldState,
        getValues,
        trigger,
      } = useForm<IMemberRegType>({ mode: 'onSubmit' });


    //============================ useFetchJoin =======================================//
    const onJoinSuccess = () =>{
        toastSuc();
        navigate("/auth/login");
    }
    const joinMutation = useFetchJoin(onJoinSuccess);
    //============================ useFetchJoin =======================================//



  //============================ useFetchGetEmailDuplicate =======================================//
    const onGetEmailDuplicateSuccess = (data:any)=>{
        if(data.data){
            toastFailMsg("이미 가입된 이메일입니다.");
            if (isEmailAvailable !== false) {
                setIsEmailAvailable(false);
            }                
            // setisEmailAvailable(false);
        }
        else{
            toastSucMsg("사용 가능한 이메일입니다.");
            setIsEmailAvailable(true);
        }
    }
    const onGetEmailDuplicateError = (error:any)=>{
        toastFail(error);
    }
    const getEmailDuplicate = useFetchGetEmailDuplicate(getValues("email"),onGetEmailDuplicateSuccess,onGetEmailDuplicateError);
  //============================ useFetchGetEmailDuplicate =======================================//
    
    const onValid = (data: IMemberRegType) => {
        if(!isEmailAvailable){
            toastFailMsg("이메일 중복검사 바랍니다.");
            return ;  
        }

        joinMutation.mutate(data);
    };

    const clickedEmailCheckBtn = async () =>{
        checkEmailDuplicate(getValues,getFieldState,trigger,getEmailDuplicate,isEmailAvailable,setIsEmailAvailable);
    }

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
                        InputProps={{
                            readOnly: isEmailAvailable,
                          }}
                        margin="normal"
                        {...register("email", {
                            required: "이메일을 입력해주세요.",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@naver.com$/i,
                                message: "이메일 형식을 확인해주세요."
                            },
                            minLength:{
                                value: 1,
                                message:"이메일을 입력해주세요."
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Button variant="contained" onClick={clickedEmailCheckBtn} disabled={isEmailAvailable}>중복검사</Button>
                        <Button variant="contained">이메일 인증</Button>
                        {/* <SharedModal child={<AuthEmail />}></SharedModal> */}
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
                        <Button variant="contained" type="submit" fullWidth disabled={!isEmailAvailable}>
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
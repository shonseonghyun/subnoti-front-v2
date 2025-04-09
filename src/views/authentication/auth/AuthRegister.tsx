import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormGetFieldState, UseFormGetValues, UseFormTrigger, useForm } from 'react-hook-form';
import { UseQueryResult } from 'react-query';
import SharedModal from 'src/components/shared/SharedModal';
import { useFetchJoin } from 'src/hooks/mutation/useFetchJoin';
import { useFetchGetEmailDuplicate } from 'src/hooks/query/useFetchGetEmailDuplicate';
import { IMemberRegType } from 'src/type/type';
import { toastFail, toastFailMsg, toastSuc, toastSucMsg } from 'src/utils/toast/toast';
import AuthEmail from './AuthEmail';
import FullscreenLoader from 'src/components/shared/FullScreenLoader';

const genders = [
    {
      value:"default",
      label:"성별을 선택해주세요.",
      disabled:true
    },
    {
      value: "MALE",
      label: "남성",
      disabled:false
      
    },
    {
      value: "FEMALE",
      label: "여성",
      disabled:false
  
    },
  ];

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
    const [isEmailAuthFlg,setIsEmailAuthFlg] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getFieldState,
        getValues,
        setFocus,
        trigger,
    } = useForm<IMemberRegType>({ mode: 'onSubmit' });
    useEffect(()=>{
        setFocus("email");
    },[]);  

    //============================ useFetchJoin =======================================//
    const onJoinSuccess = () =>{
        toastSuc();
        const href = "/auth/login";

        window.location.href = href;
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

    // 굳이 해당 컴포넌트 자체가 무거운 컴포넌트가 아니기도 하고 isEmaliAuthFlg와 연관되었기에 인증 성공 시 반드시 리랜더링 발생
    // const MemorizedValidBtn = useMemo(() =>{
    //     return (
    //         <Button variant="contained" disabled={isEmailAuthFlg}>이메일 인증</Button>
    //     )
    // },[isEmailAuthFlg]);

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
                        {isEmailAvailable && 
                            <SharedModal button={<Button variant="contained" disabled={isEmailAuthFlg}>이메일 인증</Button>}>
                                <AuthEmail isEmailAuthFlg={isEmailAuthFlg} setIsEmailAuthFlg={setIsEmailAuthFlg}/>
                            </SharedModal>
                        }
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
                            {genders.map((option) => (
                                <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                                    {option.label}
                                </MenuItem>
                            ))}
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
                        <Button variant="contained" type="submit" fullWidth disabled={!isEmailAvailable && !isEmailAuthFlg}>
                            회원가입
                        </Button>
                    </Stack>
                </Box>
            </Box>
            {subtitle}
            {joinMutation.isLoading && <FullscreenLoader />}
        </Container>
    );
};

export default AuthRegister;


// <랜더링 확인>

// - 중복검사
// case1) 중복검사 api 요청 시 실패 거절
// 랜더링 횟수: 3회(AuthRegister)
// 이유: useformhook의 trigger +useQuery 의 두번의 랜더링

// case2) 중복검사 자체 유효성 검증 실패
// 랜더링 횟수: 1회(AuthRegister)
// 이유: useformhook의 trigger +useQuery 의 두번의 랜더링

// case3) 중복검사 정상 처리
// 랜더링 횟수: 3회(AuthRegister)
// 이유: useformhook의 trigger +useQuery 의 두번의 랜더링

// - 이메일 인증
// case1) 중복검사 완료 시 이메일 인증 버튼 노출
// 랜더링 횟수: 1회(SharedModal)
// 이유:  

// case2) 이메일 인증 버튼 클릭
// 랜더링 횟수: 1회(SharedModal), 1회(AuthEmail)
// 이유:  open State true로 변경(SharedModal), Modal의 특성(1회)

// case3) 인증번호 발송
// 랜더링 횟수: 1회(AuthEmail)
// 이유: 생성된 인증번호인 authCode state 세팅 및 인증 버튼 노출을 위한 showSendBtn state true로 변경


// case4) 인증
// case4-1) 인증 실패
// 랜더링 횟수: 1회(AuthEmail)
// 이유: 유저가 입력한 인증번호 userInputAuthCode 세팅

// case4-2) 인증 성공
// 랜더링 횟수: AuthEmail -> AuthRegister -> SharedModal -> AuthEmail
// 이유: 
// 1. AuthEmail은 유저가 입력한 인증번호 userInputAuthCode 발생
// 2. AuthRegister는 AuthEmail에서 인증 성공 시 AuthRegister의 state를 변경
// 3. AuthRegister가 변경되어 자식 컴포넌트인 SharedModal 랜더링 -> 최적화 가능할듯? ->React.memo 적용(SharedModal, button, children에 해당하는 AuthEmail 모두 적용) -> 최적화 불가 판단. 이유는 SharedModal의 props인 button과 child 모두 isEmailAuthFlg와 연관되어있다. 이메일 인증 성공 시 authEmail에서 해당 state를 변경할테고 그러면 해당 state와 연관을 가진 button과 authEmail 모두 새롭게 jsx를 반환하게 되므로 SharedModal은 리랜더링되게 된다.
// 4. props인 isEmailAuthFlg가 변경되어 리랜더링

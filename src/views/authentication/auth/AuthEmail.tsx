import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { sendAuthCode } from 'src/utils/email';
import { toastFailMsg, toastSucMsg } from 'src/utils/toast/toast';


interface IAuthEmailProps{
  email:string,
  isEmailAuthFlg:boolean,
  setIsEmailAuthFlg:React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthEmail = ({email,isEmailAuthFlg,setIsEmailAuthFlg}:IAuthEmailProps) => {
  console.log("AuthEmail 랜더링");

  const inputRef = useRef<HTMLInputElement>(null);
  const [showSendBtn, setShowSendBtn] = useState(true);
  const [sentAuthCode, setSentAuthCode] = useState('');


  const postSuccess = (authCode:string)=>{
    toastSucMsg("이메일 전송 완료되었습니다.");
    setShowSendBtn(false);  
    setSentAuthCode(authCode);
  }

  const postError = ()=>{
    toastFailMsg("이메일 전송 실패되었습니다.");
  }

  const clickedSendBtn = () =>{
    sendAuthCode(email,postSuccess,postError);
  }

  const clickedValidBtn =() =>{
    if(sentAuthCode===inputRef.current?.value){
      toastSucMsg("이메일 인증 완료하였습니다.");
      setIsEmailAuthFlg(true);  
      return ;
    }

    toastFailMsg("인증번호를 다시 확인해 주세요.");
  }

  const renderAction = () => {
    if (showSendBtn) {
      return (
        <Button variant="contained" onClick={clickedSendBtn}>
          인증번호 발송
        </Button>
      );
    }
    return (
      <>
        <TextField inputRef={inputRef} InputProps={{ inputProps: { readOnly: isEmailAuthFlg }}} label="인증번호" placeholder="인증번호를 입력하세요." /> 
        <Button variant="contained" onClick={clickedValidBtn} disabled={isEmailAuthFlg}>
          인증
        </Button>
      </>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        이메일 인증
      </Typography>
      <Box marginTop={2}>
          <Stack direction="row" spacing={2} mt={2}>
            { renderAction() }
          </Stack>
      </Box>
    </Box>
  );
};

export default AuthEmail;

// export const MemorizedAuthEmail = React.memo(AuthEmail);
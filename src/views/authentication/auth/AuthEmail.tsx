import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { getAuthCode } from 'src/utils/authNumber';
import { toastFailMsg, toastInfoMsg, toastSucMsg } from 'src/utils/toast/toast';

interface IAuthEmailProps{
  isEmailAuthFlg:boolean,
  setIsEmailAuthFlg:React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthEmail = ({isEmailAuthFlg,setIsEmailAuthFlg}:IAuthEmailProps) => {
  console.log("AuthEmail 랜더링");

  const [showSendBtn, setShowSendBtn] = useState(true);
  const [userInputAuthCode, setUserInputAuthCode] = useState('');
  const [sentAuthCode, setSentAuthCode] = useState('');

  const clickedSendBtn = () =>{
    //이메일 인증번호 발송
    const authCode = getAuthCode();
    setSentAuthCode(authCode);    
    console.log("이메일 번호 발송");


    //이메일 인증번호 발송 성공 case
    toastInfoMsg("인증번호 발송하였습니다.");
    setShowSendBtn(false); //랜더링 유발 
  }

  const clickedValidBtn =() =>{
    if(sentAuthCode===userInputAuthCode){
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
        <TextField InputProps={{ inputProps: { readOnly: isEmailAuthFlg }}} label="인증번호" placeholder="인증번호를 입력하세요." onBlur={(e)=>setUserInputAuthCode(e.target.value)}  /> 
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
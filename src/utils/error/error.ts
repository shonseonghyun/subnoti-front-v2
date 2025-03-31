import { AxiosError } from "axios";

type ErrorMessage ={
    [key: string]: {
        title:string;
        content:string,
    }
}

const ERROR_CODE:ErrorMessage ={
    default:{title:'알 수 없는 오류 발생', content:"잠시 후 다시 시도 부탁드립니다." },
    
    // axios error
    ERR_NETWORK:{title:'통신 에러 발생', content:'서버가 응답하지 않습니다. \n 잠시 후 다시 시도 부탁드립니다.' },

    //http status
    400: { title: '400', content: '잘못된 요청.' },
    4001: { title: '4001', content: '요청에 대한 Validation 에러입니다.' },
    401: { title: '401', content: '인증 에러.' },
    4011: { title: '4011', content: '인증이 만료되었습니다.' },
    403: { title: '403', content: '권한이 없습니다.' },
  
}

export const getErrorDataByCode = (error:AxiosError<{code:string,msg:string}>)=>{
    //서버 측에서 예외처리한 에러 **이 경우 msg는 반드시 존재
    const serverErrorCode = error?.response?.data?.code; 
    //서버 측에서 예외처리하지 못한 에
    const httpErrorCode = error.response?.status ?? ''; 
    //서버 다운 시 발생하는 에러
    const axiosErrorCode = error?.code?? ''; 

    // 존재한다면
    if(serverErrorCode){
        return {
            title:error?.response?.data?.code,
            content:error?.response?.data?.msg
        }
    }

    if(httpErrorCode in ERROR_CODE){
        return ERROR_CODE[httpErrorCode as keyof typeof ERROR_CODE];
    }

    if (axiosErrorCode in ERROR_CODE) {
        return ERROR_CODE[axiosErrorCode as keyof typeof ERROR_CODE];
      }

    return ERROR_CODE.default;
}
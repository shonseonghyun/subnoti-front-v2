import { useEffect } from "react";
import { PrivateApi, refreshAccessTokenWithRefreshToken, setAccessToken } from "src/api/AxiosInstance";
import { useAuthStore } from "src/zustand/AuthUserInfo";

const TokenHeaderInterceptor = () => {
    const { authUserInfo } = useAuthStore();

    useEffect(()=>{
        const requestInterceptor = setAccessToken(authUserInfo.accessToken); // accessToken이 바뀔 때마다 헤더 업데이트
        const tokenRefreshInterceptor = refreshAccessTokenWithRefreshToken();
        
        return () => {
            //unmount
            //해당문이 존재하여 마운트시마다 등록된 requestInterceptor를 등록해제시켜 중복 세팅을 방지할 수 있다.
            PrivateApi.interceptors.request.eject(requestInterceptor);
            PrivateApi.interceptors.response.eject(tokenRefreshInterceptor);
        }
    },[authUserInfo]);
    
    return (
        <>
        </>
    );
};

export default TokenHeaderInterceptor;
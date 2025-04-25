import { useEffect } from "react";
import { PrivateApi, refreshAccessTokenWithRefreshToken, setAccessToken } from "src/api/AxiosInstance";
import { useAuthStore } from "src/zustand/AuthUserInfo";
import { useTokenStore } from "src/zustand/TokenReady";

const TokenHeaderInterceptor = () => {
    console.log("TokenHeaderInterceptor 랜더링");

    const { authUserInfo } = useAuthStore();
    const setTokenReady = useTokenStore((state) => state.setTokenReady);

    // useEffect(()=>{
    //     console.log("authUserInfo is changed");
    // },[authUserInfo]);
    
    useEffect(()=>{
        console.log("TokenHeaderInterceptor Mount");

        const requestInterceptor = setAccessToken(authUserInfo.accessToken); // accessToken이 바뀔 때마다 헤더 업데이트
        const tokenRefreshInterceptor = refreshAccessTokenWithRefreshToken();
        setTokenReady(true); // 인터셉터 등록 후 tokenReadt true 변경

        return () => {
            //unmount
            console.log("TokenHeaderInterceptor unmount");

            //해당문이 존재하여 마운트시마다 등록된 requestInterceptor를 등록해제시켜 중복 세팅을 방지할 수 있다.
            PrivateApi.interceptors.request.eject(requestInterceptor);
            PrivateApi.interceptors.response.eject(tokenRefreshInterceptor);
            setTokenReady(true); // 인터셉터 해제 후 tokenReadt false 변경
        }
    },[authUserInfo]);

    return (
        <>
        </>
    );
};

export default TokenHeaderInterceptor;
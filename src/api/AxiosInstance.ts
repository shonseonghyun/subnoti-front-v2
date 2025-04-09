import axios from 'axios';
import { useAuthStore } from 'src/zustand/AuthUserInfo';
import { fetchReissueAccessTokenWithRefreshToken } from './api';
import { toastFail } from 'src/utils/toast/toast';

export const PublicApi = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_IP,
  withCredentials: true,
});

export const PrivateApi = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_IP,
    withCredentials: true,
});

const RefreshApi = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_IP,
    withCredentials: true,
});

// accessToken 설정 (요청 인터셉터 등록)
export const setAccessToken = (accessToken: string) => {
  // console.log('AxiosInstance[setAccessToken] exec');

  const requestInterceptor = PrivateApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  return requestInterceptor;
};

// accessToken 갱신 및 재요청 처리
export const refreshAccessTokenWithRefreshToken = () => {
  // console.log('AxiosInstance[refreshAccessTokenWithRefreshToken] exec');

  const { authUserInfo, setAuthUserInfo, clearAuthUserInfo } = useAuthStore.getState();
  const refreshToken = authUserInfo.refreshToken;

  const refreshTokenInterceptor = PrivateApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response === undefined) {
        console.log('error 인스턴스 response 존재하지 않음');
        return Promise.reject(error);
      }

      const originalConfig = error.config;
      const code = error.response.data.code;

      if (code === 'J01' && refreshToken) {
        console.log('Reissue AccessToken With RefreshToken');

          const response = await fetchReissueAccessTokenWithRefreshToken(refreshToken);
          console.log('accessToken 재발급 응답:', response);

          // RefreshToken 만료 시
          if (response?.response?.data?.code === 'J02') {
            toastFail(response);
            clearAuthUserInfo(); // 상태 초기화
            return Promise.reject(error);
          }

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          // 상태 업데이트
          setAuthUserInfo({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            email: authUserInfo.email,
            memberId: authUserInfo.memberId,
            memberNo: authUserInfo.memberNo,
            name: authUserInfo.name,
          });

          // 재요청 Authorization 헤더 업데이트
          originalConfig.headers['Authorization'] = 'Bearer ' + newAccessToken;

          // 재요청은 RefreshApi로 처리
          return await RefreshApi(originalConfig);
      }

      return Promise.reject(error);
    }
  );

  return refreshTokenInterceptor;
};

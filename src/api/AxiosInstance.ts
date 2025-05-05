import axios from 'axios';
import { toastFailMsg } from 'src/utils/toast/toast';
import { useAuthStore } from 'src/zustand/AuthUserInfo';
import { fetchReissueAccessTokenWithRefreshToken } from './api';

export const PublicApi = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_IP,
  withCredentials: true,
  timeout:5000
});

export const PrivateApi = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_IP,
    withCredentials: true,
    timeout:5000
});

const RefreshApi = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_IP,
    withCredentials: true,
    timeout:5000
});

export const PlabFootballApi = axios.create({
  baseURL:"https://www.plabfootball.com/api/v2",
  timeout:2000
})

// accessToken 설정 (요청 인터셉터 등록)
export const setAccessToken = (accessToken: string) => {

  const requestInterceptor = PrivateApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  return requestInterceptor;
};

// accessToken 갱신 및 재요청 처리
// export const refreshAccessTokenWithRefreshToken = () => {

//   const { authUserInfo, setAuthUserInfo, clearAuthUserInfo } = useAuthStore.getState();

//   const refreshToken = authUserInfo.refreshToken;

//   const refreshTokenInterceptor = PrivateApi.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       if (error.response === undefined) {
//         console.log('error 인스턴스 response 존재하지 않음');
//         return Promise.reject(error);
//       }

//       const originalConfig = error.config;
//       const code = error.response.data.code;

//       if (code === 'J01' && refreshToken) {
//         console.log('Reissue AccessToken With RefreshToken');

//           const response = await fetchReissueAccessTokenWithRefreshToken(refreshToken);
//           console.log('accessToken 재발급 응답:', response);

//           // RefreshToken 만료 시
//           if (response?.response?.data?.code === 'J02') {
//             toastFailMsg("재로그인 바랍니다.");
//             clearAuthUserInfo(); // 상태 초기화
//             return Promise.reject(error);
//           }

//           const newAccessToken = response.data.accessToken;
//           const newRefreshToken = response.data.refreshToken;

//           // 상태 업데이트
//           setAuthUserInfo({
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//             email: authUserInfo.email,
//             memberId: authUserInfo.memberId,
//             memberNo: authUserInfo.memberNo,
//             name: authUserInfo.name,
//           });

//           // 재요청 Authorization 헤더 업데이트
//           originalConfig.headers['Authorization'] = 'Bearer ' + newAccessToken;

//           // 재요청은 RefreshApi로 처리
//           return await RefreshApi(originalConfig);
//       }

//       return Promise.reject(error);
//     }
//   );

//   return refreshTokenInterceptor;
// };

// 싱글톤
let refreshPromise: Promise<any> | null = null;

// accessToken 갱신 및 재요청 처리
export const refreshAccessTokenWithRefreshToken = () => {
  const { authUserInfo, setAuthUserInfo, clearAuthUserInfo } = useAuthStore.getState();
  const refreshToken = authUserInfo.refreshToken;

  const refreshTokenInterceptor = PrivateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;
      const code = error.response?.data?.code;

      if (code === 'J01' && refreshToken) {
        // ✅ 이미 진행 중인 refresh가 있으면 그걸 그대로 리턴
        if (refreshPromise) {
          return refreshPromise.then(() => {
            // 재발급된 토큰으로 요청 재시도
            originalConfig.headers['Authorization'] = `Bearer ${useAuthStore.getState().authUserInfo.accessToken}`;
            return RefreshApi(originalConfig);
          });
        }

        // ✅ 새 refresh 시도
        refreshPromise = (async () => {
          try {
            const response = await fetchReissueAccessTokenWithRefreshToken(refreshToken);
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;

            setAuthUserInfo({
              ...authUserInfo,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            });

            return response;
          } catch (e: any) {
            toastFailMsg("재로그인 바랍니다.");
            clearAuthUserInfo();
            throw e;
          } finally {
            // ✅ 끝나면 초기화
            refreshPromise = null;
          }
        })();

        // 첫 호출자도 기다림
        return refreshPromise.then(() => {
          originalConfig.headers['Authorization'] = `Bearer ${useAuthStore.getState().authUserInfo.accessToken}`;
          return RefreshApi(originalConfig);
        });
      }

      return Promise.reject(error);
    }
  );

  return refreshTokenInterceptor;
};

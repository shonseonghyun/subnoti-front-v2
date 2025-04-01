import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IAuthUserInfo {
  accessToken: string;
  refreshToken: string;
  memberId: string;
  memberNo: number;
  email: string;
  name: string;
}

interface AuthState {
  authUserInfo: IAuthUserInfo;
  isLogin: boolean;
  setAuthUserInfo: (info: IAuthUserInfo) => void;
  clearAuthUserInfo: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      authUserInfo: {
        accessToken: '',
        refreshToken: '',
        memberId: '',
        memberNo: 0,
        email: '',
        name: ''
      },
      isLogin: false,
      setAuthUserInfo: (info) =>
        set({
          authUserInfo: info,
          isLogin: !!info.accessToken,
        }),
      clearAuthUserInfo: () =>
        set({
          authUserInfo: {
            accessToken: '',
            refreshToken: '',
            memberId: '',
            memberNo: 0,
            email: '',
            name: '',
          },
          isLogin: false,
        }),
    }),
    {
      name: 'auth', // localStorage key
    }
  )
);

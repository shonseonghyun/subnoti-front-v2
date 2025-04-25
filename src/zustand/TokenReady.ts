import { create } from 'zustand';

interface ITokenReady {
  tokenReady: boolean;
  setTokenReady: (ready:boolean)=>void;
}

export const useTokenStore = create<ITokenReady>((set) => ({
    tokenReady: false,
    setTokenReady: (ready) => set({ tokenReady: ready }),
}));
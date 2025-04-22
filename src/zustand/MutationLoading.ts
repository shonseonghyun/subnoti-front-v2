import { create } from "zustand";

interface IMutationLoading {
    mutationLoading: boolean;
    setMutationLoading: (loading:boolean)=>void;
}
  
export const useMutationLoadingStore = create<IMutationLoading>((set)=>({
    mutationLoading:false,
    setMutationLoading: (mutationLoading) => set({ mutationLoading: mutationLoading }),
}))
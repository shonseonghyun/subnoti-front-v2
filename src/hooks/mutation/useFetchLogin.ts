import { fetchLogin } from "src/api/api";
import { ILoignRegType } from "src/type/type";
import { useApiMutation } from "./template/useApiMutation";

export const useFetchLogin = (onSuccess: (data: any) => void) => {
    return useApiMutation<ILoignRegType>(fetchLogin, {
      onSuccess,
    });
  };
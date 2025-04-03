import { fetchDelSubNoti } from "src/api/api";
import { useApiMutation } from "./template/useApiMutation";

export const useFetchDelNoti = (onSuccess: () => void) => {
    return useApiMutation<number>(fetchDelSubNoti, {
      onSuccess,
    });
  };
  
import { fetchRegSubNoti } from "src/api/api";
import { INotiRegType } from "src/type/type";
import { useApiMutation } from "./template/useApiMutation";

export const useFetchRegSubNoti = (onSuccess: () => void) => {
    return useApiMutation<INotiRegType>(fetchRegSubNoti, {
      onSuccess,
    });
  };
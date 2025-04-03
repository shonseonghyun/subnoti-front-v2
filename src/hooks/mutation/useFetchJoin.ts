import { fetchJoin } from "src/api/api";
import { IMemberRegType } from "src/type/type";
import { useApiMutation } from "./template/useApiMutation";

export const useFetchJoin = (onSuccess: () => void) => {
    return useApiMutation<IMemberRegType>(fetchJoin, {
      onSuccess,
    });
  };
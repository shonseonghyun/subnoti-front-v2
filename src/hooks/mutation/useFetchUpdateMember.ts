import { fetchUpdateMember } from "src/api/api";
import { useApiMutation } from "./template/useApiMutation";

export const useFetchUpdateMember = (onSuccess: () => void) => {
    return useApiMutation(fetchUpdateMember, {
      onSuccess,
    });
};
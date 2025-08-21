import { fetchPaySubscription } from "src/api/api";
import { IPayReqType } from "src/type/type";
import { useApiMutation } from "./template/useApiMutation";

export const useFetchPaySubscription = (onSuccess: () => void) => {
    return useApiMutation<IPayReqType>(fetchPaySubscription, {
      onSuccess,
    });
  };
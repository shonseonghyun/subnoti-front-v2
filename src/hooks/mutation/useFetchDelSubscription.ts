import { fetchDelSubscription } from "src/api/api";
import { useApiMutation } from "./template/useApiMutation";
import { ISubscriptionDelReqType } from "src/type/type";

export const useFetchDelSubscription = (onSuccess: () => void) => {
    return useApiMutation<ISubscriptionDelReqType>(fetchDelSubscription, {
      onSuccess,
    });
  };
import { UseMutationOptions, useMutation } from 'react-query';
import { toastFail } from 'src/utils/toast/toast';
import { useMutationLoadingStore } from 'src/zustand/MutationLoading';

export const useApiMutation = <TVariables, TData = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, any, TVariables>
) => {
  const setMutationLoading = useMutationLoadingStore((state) => state.setMutationLoading);

  return useMutation<TData, any, TVariables>(
    async (variables) => {
      setMutationLoading(true);
      try {
        const result = await mutationFn(variables);
        return result;
      } finally {
        setMutationLoading(false);
      }
    },
    {
      ...options,
      onError: (error, variables, context) => {
        setMutationLoading(false);
        toastFail(error);
        options?.onError?.(error, variables, context);
      },
      onSuccess: (data, variables, context) => {
        setMutationLoading(false);
        options?.onSuccess?.(data, variables, context);
      },
    }
  );
};
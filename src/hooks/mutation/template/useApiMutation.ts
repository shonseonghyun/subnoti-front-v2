import { UseMutationOptions, useMutation } from "react-query";

export const useApiMutation = <TVariables, TData = any>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: UseMutationOptions<TData, any, TVariables>
  ) => {
    return useMutation<TData, any, TVariables>(
    mutationFn, 
    {
      retry: 1,
      ...options,
    });
  };
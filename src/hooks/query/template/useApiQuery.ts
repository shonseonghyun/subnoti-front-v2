import { AxiosError } from "axios";
import { QueryKey, useQuery } from "react-query";

type SuccessHandler<T> = (data: T) => void;
type ErrorHandler = (error: AxiosError | unknown) => void;

export const useApiQuery = <TData>(
    key: QueryKey, 
    queryFn : () => Promise<TData>,
    options?: {
        enabled?: boolean;
        onSuccess?: SuccessHandler<TData>;
        onError?: ErrorHandler;
        // staleTime?: number;
        // cacheTime?: number;
    }
) => {
    return useQuery<TData, AxiosError>({
        queryKey: key,
        queryFn,
        enabled: options?.enabled ?? true,
        // staleTime: options?.staleTime ?? 0,
        // cacheTime: options?.cacheTime ?? 5 * 60 * 1000,
        onSuccess: options?.onSuccess,
        onError: options?.onError,
      });
}
import { AxiosError } from 'axios';
import { QueryKey, useQuery } from 'react-query';
import { toastFail } from 'src/utils/toast/toast';
import { useTokenStore } from 'src/zustand/TokenReady';

type SuccessHandler<T> = (data: T) => void;
type ErrorHandler = (error: AxiosError | unknown) => void;

interface UseApiQueryOptions<TData> {
  isPrivate?:boolean; //토큰 세팅 필요 여부
  enabled?: boolean; 
  suspense?: boolean;
  useErrorBoundary?: boolean;
  onSuccess?: SuccessHandler<TData>;
  onError?: ErrorHandler;
  staleTime?: number;
  cacheTime?: number;
  refetchOnMount?:boolean,
  refetchOnReconnect?:boolean,
  refetchOnWindowFocus?:boolean,
  retry?:number
}

/**
 * 커스텀 useApiQuery 훅
 *
 * @template TData - API 응답 데이터 타입
 * @template TParams - API 호출 시 전달할 파라미터 타입
 *
 * @param key - queryKey (React Query 캐시 키)
 * @param queryFn - API 요청 함수 (TParams -> Promise<TData>)
 * @param params - API 호출 파라미터
 * @param options - React Query 옵션
 */
export const useApiQuery = <TParams,TData>(
  key: QueryKey,
  queryFn: (params: TParams) => Promise<TData>,
  params: TParams,
  options?: UseApiQueryOptions<TData>
) => {
  const tokenReady = useTokenStore((state) => state.tokenReady);
  return useQuery<TData, AxiosError>({
    queryKey: key,
    queryFn: () => queryFn(params),
    refetchOnMount: options?.refetchOnMount ?? false,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    refetchOnReconnect: options?.refetchOnReconnect ?? false,
    retry:options?.retry ?? 1,
    enabled: options?.isPrivate ? tokenReady : options?.enabled ?? true, // isPrivate true인 경우 tokenReady, enabeld 설정값 존재 시 설정값, 설정되어있지 않다면(undefiend) QueryClient 기본값(true) 사용
    suspense: options?.suspense ?? false,
    useErrorBoundary: options?.useErrorBoundary ?? true,
    staleTime: options?.staleTime ?? undefined,
    cacheTime: options?.cacheTime ?? undefined,
    onSuccess: options?.onSuccess,
    onError: options?.onError ?? ((error) => toastFail(error)),
  });
};
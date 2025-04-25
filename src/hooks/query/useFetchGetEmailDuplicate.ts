import { fetchGetEmailDuplicate } from "src/api/api";
import { useApiQuery } from "./template/useApiQuery";

export const useFetchGetEmailDuplicate=(email:string,onSuccess:(data: any) => void,onError:(error:any)=>void)=>{
    return useApiQuery<string,any>(
        ["checkEmailDuplicate",email],
        fetchGetEmailDuplicate,
        email,
        {
            enabled:false,
            onSuccess:onSuccess,
            onError:onError,
            useErrorBoundary:false,
        }
    )
}
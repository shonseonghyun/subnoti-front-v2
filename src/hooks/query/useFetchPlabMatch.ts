import { fetchGetPlabMatch } from "src/api/api";
import { useApiQuery } from "./template/useApiQuery";

export const useFetchGetPlabMatch=(matchNo:number,onSuccess:()=>void,onError:(error:any)=>void)=>{
    return useApiQuery<number, any>(
        ["plabMatchNo",{matchNo:matchNo}],
        fetchGetPlabMatch,
        matchNo,
        {
            enabled:false,
            onSuccess:onSuccess,
            onError:onError,
            useErrorBoundary:false,
        }
    );
}


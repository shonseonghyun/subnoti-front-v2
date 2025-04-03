import { useQuery } from "react-query";
import { fetchGetPlabMatch } from "src/api/api";

export const useFetchGetPlabMatch=(matchNo:number,onSuccess:()=>void,onError:(error:any)=>void)=>{
    return useQuery({
        queryKey:["plabMatchNo",{matchNo:matchNo}],
        queryFn: ()=>fetchGetPlabMatch(matchNo),
        enabled:false, 
        // useErrorBoundary:false,
        onSuccess:onSuccess,
        onError: onError
    });
}


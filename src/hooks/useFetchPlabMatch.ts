import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { fetchGetPlabMatch } from "src/api/api";
import { getErrorDataByCode } from "src/utils/error/error";

export const useFetchGetPlabMatch=(matchNo:number)=>{
    return useQuery({
        queryKey:["plabMatchNo",{matchNo:matchNo}],
        queryFn: ()=>fetchGetPlabMatch(matchNo),
        enabled:false, 
        useErrorBoundary:false,
        onError:(error:any)=>{
            if(error.response.data){
                toast.error("존재하지 않는 매치번호입니다.",{
                  position:"top-center"
                });
                return ;
            }

            toast.error(getErrorDataByCode(error).content,{
              position:"top-center"
            });
        }
    });
}
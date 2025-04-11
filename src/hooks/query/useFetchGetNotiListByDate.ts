import { useQuery } from "react-query";
import { fetchGetSubNotiListByDate } from "src/api/api";

export const useFetchGetNotiListByDate=(
    memberNo:number,
    selectedDate:string,
    pageSize:number,
    nextNotiNo:number|undefined,
    onSuccess:(data:any)=>void
)=>{
    return useQuery({
        queryKey:["noti","list",memberNo,selectedDate,nextNotiNo],
        queryFn: ()=>fetchGetSubNotiListByDate(memberNo,selectedDate,pageSize,nextNotiNo),
        onSuccess:onSuccess
    });
}
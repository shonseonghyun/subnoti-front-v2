import { fetchGetSubNotiListByDate } from "src/api/api";
import { useApiQuery } from "./template/useApiQuery";

export const useFetchGetNotiListByDate=(
    memberNo:number,
    selectedDate:string,
    pageSize:number,
    nextNotiNo:number|undefined,
    onSuccess:(data:any)=>void
)=>{
    return useApiQuery<
        {   
            memberNo:number,
            selectedDate:string,
            pageSize:number,
            nextNotiNo:number|undefined, 
        },
        any
    >(
        ["noti","list",memberNo,selectedDate,nextNotiNo],
        fetchGetSubNotiListByDate,
        {memberNo:memberNo,selectedDate:selectedDate,pageSize:pageSize,nextNotiNo:nextNotiNo},
        {
            isPrivate:true,
            onSuccess:onSuccess
        }
    )
}
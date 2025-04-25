import { fetchGetNotiRegDates } from "src/api/api";
import { useApiQuery } from "./template/useApiQuery";

export const useFetchGetNotiRegDates=(memberNo:number,startDt:string,endDt:string)=>{
    return useApiQuery<
            { 
                memberNo: number,
                 startDt: string,
                  endDt: string 
            },
            any
        >(
            ["noti","dates",memberNo,startDt,endDt],
            fetchGetNotiRegDates,
            {memberNo,startDt,endDt},
            {
                isPrivate:true
            }
    )
}
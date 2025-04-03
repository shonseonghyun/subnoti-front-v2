import { useQuery } from "react-query";
import { fetchGetSubNotiListByDate } from "src/api/api";

export const useFetchGetNotiListByDate=(memberNo:number,selectedDate:string)=>{
    return useQuery({
        queryKey:["noti","list",memberNo,selectedDate],
        queryFn: ()=>fetchGetSubNotiListByDate(memberNo,selectedDate),
    });
}
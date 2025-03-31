import {useQuery} from "react-query"
import { fetchGetSubNotiListByDate } from "src/api/api";
import { toastFail } from "src/utils/toast/toast";

export const useFetchGetNotiListByDate=(memberNo:number,selectedDate:string)=>{
    return useQuery({
        queryKey:["noti","list",memberNo,selectedDate],
        queryFn: ()=>fetchGetSubNotiListByDate(memberNo,selectedDate),
        onError(err) {
            toastFail(err);
        },
    });
}
import { useQuery } from "react-query";
import { fetchGetNotiRegDates } from "src/api/api";
import { toastFail } from "src/utils/toast/toast";

export const useFetchGetNotiRegDates=(memberNo:number,startDt:string,endDt:string)=>{
    return useQuery({
        queryKey:["noti","dates",memberNo,startDt,endDt],
        queryFn: ()=>fetchGetNotiRegDates(memberNo,startDt,endDt),
        onError(err) {
            toastFail(err);
        },
        // select(data) {
        //    npm if(data.data){
        //         let datesArr = data.data;
        //         for(var i=0; i<datesArr.length;i++){
        //             datesArr[i]=formatDate(datesArr[i]);
        //         }
        //     }
        //     return data;
        // },
    });
}
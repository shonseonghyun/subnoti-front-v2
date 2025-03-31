import { useMutation, useQueryClient } from "react-query";
import { fetchDelSubNoti } from "src/api/api";
import { toastSuc } from "src/utils/toast/toast";

export const useFetchDelNoti=()=>{
    const queryClient= useQueryClient();

    return useMutation(
        (notiNo:number)=>fetchDelSubNoti(notiNo),
        {
            // onSuccess:onSuccess,
            onSuccess(){
                toastSuc();
                // 리스트를 invalidate 시키지만 refetch 시킴
                queryClient.invalidateQueries(['noti'], { refetchInactive: true });
            }
        }
    );
}
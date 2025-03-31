import { useMutation } from "react-query";
import { fetchRegSubNoti } from "src/api/api";
import { INotiRegType } from "src/type/type";

export const useRegFetchSubNoti=(onSuccess:any)=>{
    return useMutation(
        (data:INotiRegType)=>fetchRegSubNoti(data),
        {
            onSuccess:onSuccess,
        }
    );
}
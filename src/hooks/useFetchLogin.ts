import { useMutation } from "react-query";
import { fetchLogin } from "src/api/api";
import { ILoignRegType } from "src/type/type";

export const useFetchLogin=(onSuccess:any)=>{
    return useMutation(
        (data:ILoignRegType)=>fetchLogin(data),
        {
            onSuccess:onSuccess
        }
    );
}
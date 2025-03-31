import { useMutation } from "react-query";
import { fetchJoin } from "src/api/api";
import { IMemberRegType } from "src/type/type";

export const useFetchJoin=(onSuccess:any)=>{
    return useMutation(
        (data:IMemberRegType)=>fetchJoin(data),
        {
            onSuccess:onSuccess
        }
    );
    
}
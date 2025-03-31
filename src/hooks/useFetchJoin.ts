import { useMutation } from "react-query";
import { fetchJoin } from "src/api/api";
import { IJoinRegType } from "src/type/type";

export const useFetchJoin=(onSuccess:any)=>{
    return useMutation(
        (data:IJoinRegType)=>fetchJoin(data),
        {
            onSuccess:onSuccess
        }
    );
    
}
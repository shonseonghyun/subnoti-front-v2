import { useQuery } from "react-query";
import { fetchGetEnum } from "src/api/api";

export const useFetchGetEnum=(key:string)=>{
    return useQuery({
        queryKey:["enum",{"key":key}],
        queryFn: ()=>fetchGetEnum(key),
    });
}
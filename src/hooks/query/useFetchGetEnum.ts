import { fetchGetEnum } from "src/api/api";
import { useApiQuery } from "./template/useApiQuery";

export const useFetchGetEnum=(key:string)=>{
    // return useQuery({
    //     queryKey:["enum",{"key":key}],
    //     queryFn: ()=>fetchGetEnum(key),
    // });

    return useApiQuery<string,any>(
        ["enum",{key}],
        fetchGetEnum,
        key,
    )
}
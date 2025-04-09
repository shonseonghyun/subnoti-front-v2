import { useQuery } from "react-query";
import { fetchGetMember } from "src/api/api";

export const useFetchGetMember=(memberNo:number)=>{
    return useQuery({
        queryKey:["member",{memberNo}],
        queryFn: ()=>fetchGetMember(memberNo),
    });
}
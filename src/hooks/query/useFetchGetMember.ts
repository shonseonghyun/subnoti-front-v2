import { fetchGetMember } from "src/api/api";
import { useApiQuery } from "./template/useApiQuery";

export const useFetchGetMember=(memberNo:number)=>{
    return useApiQuery<number, any>(
        ["member",{memberNo}],
        fetchGetMember,
        memberNo,
        {
            isPrivate:true
        }
    );
}
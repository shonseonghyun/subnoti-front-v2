import { useQuery } from "react-query";
import { fetchGetEmailDuplicate } from "src/api/api";

export const useFetchGetEmailDuplicate=(email:string,onSuccess:(data: any) => void,onError:(error:any)=>void)=>{
    
    return useQuery({
        queryKey:["checkEmailDuplicate",email],
        queryFn: ()=>fetchGetEmailDuplicate(email),
        enabled:false,
        onSuccess: onSuccess,
        onError:onError
    });
}

// export const useFetchGetEmailDuplicates = (
//     email: string,
//     onSuccess: (data: any) => void,
//     onError: (error: any) => void
//   ) => {
//     return useApiQuery(
//       ['checkEmailDuplicate', email],
//       () => fetchGetEmailDuplicate(email),
//       {
//         enabled: false,
//         onSuccess,
//         onError,
//       }
//     );
//   };
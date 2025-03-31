import { UseFormGetValues } from "react-hook-form";
import { useCallback, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { ILoignRegType } from "src/type/type";

function useRememberId(initValue:boolean,getValues:UseFormGetValues<ILoignRegType>)
// :[boolean,()=>void,React.RefObject<HTMLInputElement> | null,()=>void,string] 
{
    const [isRememberId, setIsRememberId] = useState<boolean>(initValue);
    const [cookies,setCookie,removeCookie] = useCookies(["rememberId"]);
    const checkboxRef = useRef<HTMLInputElement>(null);

    /* 리랜더링 최소화 */
    //방법 1. 마운트 시 useEffect 사용
    // useEffect(()=>{
      //     console.log("마운트  ");
      //     if(cookies.rememberId != undefined){
      //         setIsRememberId(true);
      //     };
      // },[]);
  
      // 방법2. useMemo 사용
      useMemo(()=>{
        if(cookies.rememberId != undefined){
          setIsRememberId(true);
        };
      },[])
  
    const onToggle = useCallback(()=>{
      setIsRememberId((prev)=>!prev);
    },[]);
    
    const doRememberId= ()=>{
      if(checkboxRef.current){
        if(checkboxRef.current.checked){
            setCookie("rememberId",getValues("email"),{
                path:"/"
            })
        }
        else{
            removeCookie("rememberId",{
                path:"/"
            })
        }
    }
    }
  
    return [isRememberId,onToggle,checkboxRef,doRememberId,cookies.rememberId];
  }
  
export default useRememberId;
import { useEffect, useRef } from "react";

//
export function useDidUpdate(callback:()=>void,deps:any[]){
    const didMount = useRef(false);

    useEffect(()=>{
        if(!didMount.current){
            didMount.current=true;
            console.log("첫 마운트이므로 패스");
        }
        else{
            console.log("콜백");
            callback();
        }
    },deps);
}
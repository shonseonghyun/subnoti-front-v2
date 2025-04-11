import axios from "axios";
import { ILoignRegType, IMemberRegType, INotiRegType } from "src/type/type";
import { PrivateApi, PublicApi } from "./AxiosInstance";

export const fetchLogin = async(data:ILoignRegType)=>{
    const url = '/api/v1/auth/login';
    return await PublicApi.post(url,
        data
    ).then(response=>response.data);
}

export const fetchJoin = async(data:IMemberRegType)=>{
    const url = '/api/v1/member';
    return await PublicApi.post(url,
        data
    ).then(response=>response.data);
}


export const fetchRegSubNoti = async (data:INotiRegType)=>{
    const url = '/api/v1/noti/freeSub';
    return await PrivateApi.post(url,
        data
    ).then(response=>response.data);
}

export const fetchDelSubNoti = async (notiNo:number)=>{
    const url = `/api/v1/noti/freeSub/${notiNo}`;
    return await PrivateApi.delete(url).then(response=>response.data);
}

export const fetchGetPlabMatch = async (matchNo:number)=>{
    return axios.get(`https://www.plabfootball.com/api/v2/matches/${matchNo}/`)
}

export const fetchGetSubNotiList = async (memberNo:number)=>{
    const url = `/api/v1/noti/freeSub/member/${memberNo}`;
    return await PrivateApi.get(url)
    .then(response=>response.data);
}

export const fetchGetSubNotiListByDate = async (memberNo:number,selectedDate:string,pageSize:number,nextNotiNo:number|undefined)=>{
    const paramOfPageSize = `?pageSize=${pageSize}`;
    const paramOfNextNotiNo = nextNotiNo ? `&notiNo=${nextNotiNo}` : ""
    const url = `/api/v1/noti/freeSub/member/${memberNo}/date/${selectedDate}`+paramOfPageSize+paramOfNextNotiNo;
    return await PrivateApi.get(url)
    .then(response=>response.data);
}

export const fetchGetEnum = async (key:string)=>{
    const url = `/api/v1/enum/${key}`;
    return await PublicApi.get(url)
    .then(response=>response.data);
}

export const fetchGetMember = async (memberNo:number)=>{
    const url = `/api/v1/member/${memberNo}`;
    return await PrivateApi.get(url)
    .then(response=>response.data);
}

export const fetchUpdateMember = async ({
    memberNo,
    data,
  }: {
    memberNo: number;
    data: any;
  })=>{
    const url = `/api/v1/member/${memberNo}`;
    return await PrivateApi.put(url,
        data
    ).then(response=>response.data);
}

export const fetchGetEmailDuplicate = async (email:string)=>{
    const url = `/api/v1/member/email/duplicate/${email}`;
    return await PublicApi.get(url)
    .then(response=>response.data);
}

export const fetchReissueAccessTokenWithRefreshToken = async (refreshToken:string)=>{
    const url = `/api/v1/auth/reissue`;
    return await PublicApi.post(url,{
        refreshToken:refreshToken
        }
    ).then(response=>response.data)
    .catch(error=>error)
    ;
}


export const fetchGetNotiRegDates = async (memberNo:number,startDt:string,endDt:string)=>{
    const url = `/api/v1/noti/freeSub/member/${memberNo}/dates`;
    const queryString = `?startDt=${startDt}&endDt=${endDt}`;
    const finalUrl = url+queryString;
    return await PrivateApi.get(finalUrl)
    .then(response=>response.data);
}
export interface ILoignRegType{
    email:string,
    pwd:string
}

export interface IMemberRegType{
    email:string,
    pwd:string,
    pwdConfirm:string,
    name:string,
    birthDt:string,
    gender:string,
    tel:string
}

export interface INotiRegType{
    matchNo:number,
    subType:string,
    memberNo:number,
    email:string
}


export interface INotiRegDatesType{
    memberNo:number,
    startDt:string,
    endDt:string
}
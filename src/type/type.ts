export interface ILoignRegType{
    email:string,
    pwd:string
}

export interface IMemberRegType{
    email:string,
    name:string,
    pwd:string,
    pwdConfirm:string,
    birthDt:string,
    gender:string,
    tel:string
}

export interface IMemberUpdateType{
    name:string,
    pwd:string,
    pwdConfirm:string,
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
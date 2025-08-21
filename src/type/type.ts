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


export interface IPayReqType{
    memberNo:number,
    amount:number,
    paymentMethod:string
}

export interface ISubscriptionDelReqType{
    memberNo:number,
    subscriptionNo:number,
}

export const genders = [
    {
      value:"default",
      label:"성별을 선택해주세요.",
      disabled:true
    },
    {
      value: "MALE",
      label: "남성",
      
    },
    {
      value: "FEMALE",
      label: "여성",
    },
  ];

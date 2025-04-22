import emailjs from 'emailjs-com';

export function getAuthCode(){
    return String(Math.floor(Math.random()*1000000)).padStart(6, "0");
}

export function sendAuthCode(email:string,postSuccess:(authCode:string)=>void,postError:()=>void){
    const authCode = getAuthCode();

    console.log("email: ",email);

    const templateParams = {
        to_email: "sunghyun7895@naver.com", // 수신 이메일 ex) test@test.gmail.com,
        authCode : authCode,
        reply_to: "no-reply@subnoti.com"
    };

    try{
        emailjs
          .send(
              import.meta.env.VITE_APP_MAIL_SERVICE_ID, // 서비스 ID
              import.meta.env.VITE_APP_MAIL_TEMPLATE_ID, // 템플릿 ID
              templateParams,
              import.meta.env.VITE_APP_MAIL_PUBLIC_KEY, // Public Key
          )
          .then(() => {
            postSuccess(authCode);
          })
          .catch(() => {
            postError();
          });
      }catch{
        postError();
      }
    

}
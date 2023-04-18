import React from 'react'
import VerifyEmailComponents from '@/components/auth/verifyEmail';
import { postAPI } from '@/services/fetchAPI'
import Notification from '@/components/notification';

interface Props {
  searchParams: {
    key: string;
    email: string;
    role: string;
    time:number;
  }
}


 const VerifyEmailContainer = async ({searchParams}:Props): Promise<JSX.Element> => {
  const {key, email, role} = searchParams;
 
  
  if(!key || !email || !role){
    return (
      <div>
          <VerifyEmailComponents>
              <Notification type="error" message="Doğrulama Verileri Eksik Lütfen Tekrar Deneyin." label="Doğrulama Başarısız!" remainingTime={0} targetButtonName="Ana Sayfa" targetUrl="/"/>
          </VerifyEmailComponents>
      </div>
    )
 }

 else{
    const {status, message, error}:{status:string, message:string, error:string} = await postAPI("/auth/verifyEmail", {key, email, role});

  return (
    <div>
        <VerifyEmailComponents>
            {
              // type="info", 
              // message="Lütfen tekrar deneyiniz.", 
              // label="Bir Hata Oluştu.", 
              // targetUrl="/", 
              // targetButtonName="Ana Sayfa",
              // backButtonName="Geri Dön",
              // backUrl = "/",
              // remainingTime = 10
                status == "success" && !error ?
                <Notification type="success" message={message} label="Doğrulama Başarılı!" remainingTime={0} backButtonName="Ana Sayfa" targetButtonName="Giriş Yap" backUrl="/" targetUrl={`/auth/login/${role}`} />
                :
                <Notification type="error" message={message} label="Doğrulama Başarısız!" remainingTime={0} backButtonName="Ana Sayfa" targetButtonName="Yeniden Doğrulama" backUrl="/" targetUrl={`/auth/sendVerifyEmail`}/>
            }
            
        </VerifyEmailComponents>
    </div>
  )
 }
 
  
}

export default VerifyEmailContainer;
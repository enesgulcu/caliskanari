import React from 'react'
import VerifyEmailComponents from '@/components/auth/verifyEmail';
import { postAPI } from '@/services/fetchAPI'
import Notification from '@/components/notification';

export default async function VerifyEmailContainer({searchParams}) {
 
  const {key, email, role} = searchParams;

  if(!key || !email || !role){
    return (
      <div>
          <VerifyEmailComponents>
              <Notification type="error" message="Doğrulama Verileri Eksik Lütfen Tekrar Deneyin." label="Doğrulama Başarısız!" url="/" buttonText="Anasayfaya Dön"/>
          </VerifyEmailComponents>
      </div>
    )
 }

 else{
  const {status, message, error} = await postAPI("/auth/verifyEmail", {key, email, role});
  
  return (
    <div>
        
        <VerifyEmailComponents>
            {
                status == "success" && !error ?
                <Notification type="success" message={message} label="Doğrulama Başarılı!" url="/" buttonText={"Anasayfaya Dön"} />
                :
                <Notification type="error" message={error} label="Doğrulama Başarısız!" url="/" buttonText={"Anasayfaya Dön"}/>
            }
            
        </VerifyEmailComponents>
    </div>
  )
 }
 
  
}
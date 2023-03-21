import React from 'react'
import VerifyEmailComponents from '@/components/auth/verifyEmail';
import { postAPI } from '@/services/fetchAPI'
import Notification from '@/components/notification';

export default async function VerifyEmailContainer({searchParams}) {
 
  const {key, email, role} = searchParams;
 
  //let {status, message, error} = await postAPI("/auth/verifyEmail", {key, email, role});
    let status = "success"
    let message = "Doğrulama Başarılı"
    let error = null

  
  return (
    <div>
        
        <VerifyEmailComponents>
            {
                status == "success" && !error ?
                <Notification type="success" message={message} label="Doğrulama Başarılı!" url="/" />
                :
                <Notification type="error" message={error} label="Doğrulama Başarısız!" url="/"/>
            }
            
        </VerifyEmailComponents>
    </div>
  )
}
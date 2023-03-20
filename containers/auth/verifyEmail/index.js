import React from 'react'
import VerifyEmailComponents from '@/components/auth/verifyEmail';
import { postAPI } from '@/services/fetchAPI'
import Notification from '@/components/notification';

export default async function VerifyEmailContainer({searchParams}) {
 
  const {key, email, role} = searchParams;
 
  const {status, message, error} = await postAPI("/auth/verifyEmail", {key, email, role});
    

  
  return (
    <div>
        status = {status}
        <hr />
        message = {message}
        <hr />
        error = {error}
        <hr />
        {/* <VerifyEmailComponents>
            {
                status == "success" && !error ?
                <Notification type="success" message={message} label="Doğrulama Başarılı!" />
                :
                <Notification type="error" message={error} label="Doğrulama Başarısız!"/>
            }
            
        </VerifyEmailComponents> */}
    </div>
  )
}
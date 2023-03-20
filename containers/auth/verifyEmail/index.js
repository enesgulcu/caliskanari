import React from 'react'
import VerifyEmailComponent from '@/components/auth/verifyEmail'
import {postAPI} from '@/services/fetchAPI';
import {notFound} from 'next/navigation';
import Notification from '@/components/notification';

export default async function VerifyEmailContainer({searchParams}) {

  try {
    // eğer key veya mail boş ise mail doğrulama talebi gelmemiş demektir.
    // mail doğrulama formunu göster.
    if(!searchParams || !searchParams.email){
      
      // Mail doğrulama formu.
      return(
        <VerifyEmailComponent/>
      )
    }
    
    else if(
      
      searchParams.key &&
      searchParams.email &&
      searchParams.time &&
      searchParams.role
      ){
       
        const {error, message, status} = await postAPI("/auth/verifyEmail", searchParams);
        if(error){ 
          throw new Error(error);
        }
        if(status === "success"){
          return <Notification url={"/"} label={"Mail Doğrulama Başarılı!"} message={message} type={"success"} buttonText={"Ana Sayfaya Git"} />
        }
        else{
          return <Notification url={"/"} label={"Mail Doğrulama Başarısız!"} message={message} type={"error"} buttonText={"Ana Sayfaya Git"} />
        }
      }

      else{
        
        return notFound();
      }
    
  } catch (error) {
    console.log(error.message);
      return notFound();
  }
  }

    
  
  


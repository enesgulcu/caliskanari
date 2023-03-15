import React from 'react'
import VerifyEmailComponent from '@/components/auth/verifyEmail'
import VerifyEmail from '@/services/auth/verifyEmail'
import {notFound} from 'next/navigation'

export default async function VerifyEmailContainer({searchParams}) {



  // eğer key veya mail boş ise 404 Not Foud döndür.
  if(
    searchParams.key == undefined ||
    searchParams.key == null ||
    searchParams.key == "" ||
    searchParams.email == undefined ||
    searchParams.email == "" ||
    searchParams.email == null ||
    searchParams.time == undefined ||
    searchParams.time == "" ||
    searchParams.time == null ||
    searchParams.role == "undefined" ||
    searchParams.role == "" ||
    searchParams.role == null
    ){
    return notFound();
  }

    const {status, error, message} = await VerifyEmail(searchParams);

    if(status){
      return (
        <>  
            <VerifyEmailComponent status={status} error={error} message={message}/>
        </>
      )
    }
    else{
      return (
        <>  
          <VerifyEmailComponent status={error} error={error} message={message}/>
        </>
      )
      // BURAYA HATA BİLDİRİMİNİ GÖSTEREN KOMPENENT EKLENECEK VE İÇİNE HATA MESAJI OTOMATİK GÖNDERİLECEK YAPILMADI!
    }

  
  

  
}

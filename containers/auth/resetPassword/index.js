import React from 'react'
import ResetPasswordComponent from '@/components/auth/resetPassword'
import ResetPassword from 'functions/auth/resetPassword'
import {notFound} from 'next/navigation'

export default async function ResetPasswordContainer({searchParams}) {



  // eğer key veya mail boş ise 404 Not Foud döndür.
  if(
    searchParams.key == undefined ||
    searchParams.key == null ||
    searchParams.key == "" ||
    searchParams.email == undefined ||
    searchParams.email == "" ||
    searchParams.email == null
    ){
    return notFound();
  }

    const {success, error} = await ResetPassword(searchParams);
  
    if(success){
      // BURAYA ŞİFRE SIFIRLAMA SAYFASINI GÖSTEREN KOMPENENT EKLENECEK YAPILMADI!
      return (
        <>  
            <ResetPasswordComponent/>
        </>
      )
    }
    else{
      return (
        <>  
          <h2>HATA! {error}</h2>
        </>
      )
      // BURAYA HATA BİLDİRİMİNİ GÖSTEREN KOMPENENT EKLENECEK VE İÇİNE HATA MESAJI OTOMATİK GÖNDERİLECEK YAPILMADI!
    }

  
  

  
}

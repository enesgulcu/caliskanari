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

    const {success, error, email} = await ResetPassword(searchParams);

  
    if(!success || error || !email){
      return (
      <div>
        <h2>{error}</h2>
      </div>
      )
    }

    return (
      <>  
          <ResetPasswordComponent email={email}/>
      </>
    )

  
  

  
}

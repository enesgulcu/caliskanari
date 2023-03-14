import React from 'react'
import VerifyEmailComponent from '@/components/auth/verifyEmail'
import {VerifyEmail} from '@/services/auth/verifyEmail'
import {notFound} from 'next/navigation'
export default async function VerifyEmailContainer({searchParams}) {

  const data = await VerifyEmail({searchParams});
  if(searchParams.key && searchParams.mail && searchParams.time && searchParams.role){
    return (
      <>  
          <VerifyEmailComponent data={data}/>
      </>
    )
  }
  else{
    return notFound();
  }

  
}

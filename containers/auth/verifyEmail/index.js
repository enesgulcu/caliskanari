import React from 'react'
import VerifyEmailComponent from '@/components/auth/verifyEmail'
import {VerifyEmail} from '@/services/auth/verifyEmail'
export default async function VerifyEmailContainer({searchParams}) {

  const data = await VerifyEmail({searchParams});

  return (
    <>  
        <VerifyEmailComponent data={data}/>
    </>
  )
}

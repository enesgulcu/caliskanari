import React from 'react'
import ResetPasswordComponent from '@/components/auth/resetPassword'
import ResetPassword from '@/services/auth/resetPassword'
export default async function ResetPasswordContainer({searchParams}) {

  //const data = await ResetPassword({searchParams});

  return (
    <>  
        <ResetPasswordComponent/>
    </>
  )
}

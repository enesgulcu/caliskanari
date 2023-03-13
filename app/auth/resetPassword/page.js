import React from 'react'
import ResetPasswordContainer from '@/containers/auth/resetPassword'
// api>auth>register içinden bu sayfaya searchParams ile doğrulama maillerini gönderiyoruz. 
// buradan da apiye verileri gönderip doğrulama işlemini tamamlıyoruz.
export default async function ResetPassword({searchParams}) {      

  return (
    <>
      <ResetPasswordContainer searchParams={searchParams}/>
    </>
  )
}
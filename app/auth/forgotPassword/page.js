import React from 'react'
import ForgotPasswordContainer from '@/containers/auth/forgotPassword'
// api>auth>register içinden bu sayfaya searchParams ile doğrulama maillerini gönderiyoruz. 
// buradan da apiye verileri gönderip doğrulama işlemini tamamlıyoruz.
export default async function ForgotPassword() {      

  return (
    <>
      <ForgotPasswordContainer/>
    </>
  )
}
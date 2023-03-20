import React from 'react'
import SendVerifyEmailContainer  from '@/containers/auth/sendVerifyEmail';
// api>auth>register içinden bu sayfaya searchParams ile doğrulama maillerini gönderiyoruz. 
// buradan da apiye verileri gönderip doğrulama işlemini tamamlıyoruz.

//NOT: mailden tıklanan buton ile searchParams'a veriler gelir.
export default async function SendVerifyEmailPage() {
  

  return (
    <>
      <SendVerifyEmailContainer/>
    </>
  )
}
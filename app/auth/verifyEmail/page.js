import React from 'react'
import { getDataByUnique } from "@/functions/auth/register/index";
import VerifyEmailContainer from '@/containers/auth/verifyEmail'
// api>auth>register içinden bu sayfaya searchParams ile doğrulama maillerini gönderiyoruz. 
// buradan da apiye verileri gönderip doğrulama işlemini tamamlıyoruz.
export default async function VerifyEmail({searchParams}) {
  

  return (
    <>
      <VerifyEmailContainer searchParams={searchParams}/>
    </>
  )
}
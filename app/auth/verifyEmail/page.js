import React from 'react'
import VerifyEmailContainer from '@/containers/auth/verifyEmail';

export default async function VerifyEmailPage({searchParams}) {
    
  return (
    <>
        <VerifyEmailContainer searchParams={searchParams}/>
    </>
  )
}
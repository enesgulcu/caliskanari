import React from 'react'
import ResetPasswordContainer from '@/containers/auth/resetPassword'

export default function resetPassword({searchParams}) {

  return (
    <>
      <ResetPasswordContainer searchParams={searchParams}/>
    </>
  )
}


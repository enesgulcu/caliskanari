import React from 'react'
import Link from 'next/link'

export default function LoginComponent() {
  return (
    <>
      <Link href="/auth/login/student">Student Login Page</Link>
      <hr />
      <Link href="/auth/login/teacher">Teacher Login Page</Link>
    </>
  )
}
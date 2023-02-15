import React from 'react'
import Link from 'next/link'

export default function HomeContainer() {
  return (
    <> 
    <h1>#### HomeContainer ####</h1>     
      
      <Link className='text-red-600 font-bold' href="/auth/login">Login</Link>
      <br />
      <Link className='text-green-600 font-bold' href="/auth/register">Register</Link>
      
    </>
  )
}


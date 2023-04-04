import React from 'react'
// {children} -> Notification componentini buraya alıyoruz.
export default async function VerifyEmailComponents({children}) {
    
  return (
    <div>
        {await children}
    </div>
  )
}
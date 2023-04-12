"use client";

import React from 'react'
import Link from 'next/link'

// session: giriş yapmış kullanıcıyı temsil eder varsa bilgileri içinde barındırır.
// signIn:  kullanıcıyı giriş yapmaya yönlendirmek için kullanılır.
// signOut: kullanıcıyı çıkış yapmaya yönlendirmek için kullanılır.
import { signIn, signOut, useSession } from 'next-auth/react'

 const HomeContainer:React.FC = () => {

  // useSession ile session bilgilerine erişebiliriz.
  const {data}= useSession();

  return (
    <> 
    <h1>#### HomeContainer ####</h1>

      { /* 
        session var mı ?
        VARSA -> logOut seçeneğini göster.
        YOKSA -> login seçeneğini göster 
        */
        data?.user ? 
      (
        // signOut fonksiyonu çalıştığında kullanıcıyı "çıkış" yapmaya yönlendirmek için kullanılır.
        <button className='text-red-600 font-bold' onClick={()=> signOut()}>Çıkış Yap</button>
      ):
      (        
        // signIn fonksiyonu çalıştığında kullanıcıyı "giriş" yapmaya yönlendirmek için kullanılır.
        <div>        
          <button className='text-green-600 font-bold m-4' onClick={()=> signIn()} >Giriş Yap</button>
          <hr />
          <Link href='/auth/register/'>
            <button className='text-purple-600 font-bold m-4' >Kayıt Ol</button>
          </Link>
        </div>
      )
      
    }
    </>
  )
}

export default HomeContainer;

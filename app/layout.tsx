'use client'
import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'

import { Provider } from 'react-redux';
import store from '@/redux/stores/index';
import Navbar from '@/components/other/navbar';



/* 
import { signIn, signOut, useSession } from 'next-auth/react'
const {data}= useSession();
data?.user?.role -> kullanıcının rolüne erişebiliriz.
1- admin
2- teacher
3- student
*/
const links = [
  { url: '/', text: 'Ana Sayfa' },
  {
    url: '#',
    text: 'Giriş Yap',
    bannedRoles: ['admin', 'teacher', 'student'],
    submenu: [
      { url: '/auth/login/admin', text: 'Admin Giriş', accessRoles: ['admin'], bannedRoles: ['teacher', 'student'] },
      { url: '/auth/login/teacher', text: 'Öğretmen Giriş' },
      { url: '/auth/login/student', text: 'Öğrenci Giriş' },
    ],
  },
  {
    url: '#',
    text: 'Kayıt Ol',
    bannedRoles: ['admin', 'teacher', 'student'],
    submenu: [
      { url: '/auth/register/teacher', text: 'Öğretmen Kayıt' },
      { url: '/auth/register/student', text: 'Öğrenci Kayıt' },
    ],
  },

  {
    url: '#',
    text: 'Dashboards',
    submenu: [
      { url: '/dashboard/admin', text: 'Admin Dashboard' },
      { url: '/dashboard/teacher', text: 'Öğretmen Dashboard' },
      { url: '/dashboard/student', text: 'Öğrenci Dashboard' },
    ],
  },

  // {
    //   url: '/products',
    //   text: 'Products',
    //   accessRoles: ['admin'],
    //   bannedRoles: ['teacher', 'student'],
    //   submenu: [
    //     { url: '/auth/login/admin', text: 'Admin Giriş', accessRoles: ['admin'], bannedRoles: ['teacher', 'student'] },
    //     { url: '/products/category2', text: 'Category 5' },
    //     { url: '/products/category3', text: 'Category 6' },
    //   ],
    // },
    // {
    //   url: '/contact',
    //   text: 'Contact',
    //   button: true,
    // },
    // Diğer linkleri burada da tanımlayabilirsiniz
  ];


interface Props {
  session: Session | null
  children: React.ReactNode
}

interface Store{
  store: any
}

 const RootLayout: React.FC <Props> = ({ children, session } ) => {
  return (
    <html lang="tr">

      <head />
      <body>
        {/* Redux için Ana Layout yapımızı sarmallıyoruz ve store'u içine prop olarak gönderiyoruz. */}
        <Provider store={store}>
          {/* SessionProvider ile sarmallarız ki tüm route lara erişebilelim diye / yukarıda "use client" tanımlamayı unutma! */}
          <SessionProvider session={session}>
            <Navbar links={links}/>
            {children}
          </SessionProvider>  
        </Provider>      
      </body>
    </html>
  )
}

export default RootLayout

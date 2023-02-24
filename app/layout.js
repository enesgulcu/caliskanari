'use client'
import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children, session }) {
  return (
    <html lang="tr">

      <head />
      <body>
        {/* SessionProvider ile sarmallarız ki tüm route lara erişebilelim diye / yukarıda "use client" tanımlamayı unutma! */}
        <SessionProvider session={session}>
          {children}
        </SessionProvider>        
      </body>
    </html>
  )
}

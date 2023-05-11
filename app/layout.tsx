'use client'
import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'

import { Provider } from 'react-redux';
import store from '@/redux/stores/index';


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
            {children}
          </SessionProvider>  
        </Provider>      
      </body>
    </html>
  )
}

export default RootLayout

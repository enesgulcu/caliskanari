import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="tr">

      <head />
      <body>
        {children}
      </body>
    </html>
  )
}

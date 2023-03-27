"use client"
import {MdDone, MdWarningAmber, MdCircleNotifications, MdOutlineErrorOutline } from "react-icons/md";
import { useState , useEffect, useCallback} from "react";
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

// url = yönlendirilecek sayfa
// label = başlık
// type = info, error, success, warning
// message = gösterilecek mesaj
// buttonText = buton yazısı

export default function Notification({type="info", message="Lütfen tekrar deneyiniz.", label="Bir Hata Oluştu.", url="/", buttonText="Ana Sayfa", remainingTime}){

  
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
 
  if(searchParams){
    remainingTime = searchParams.get("remainingTime") || 0;
    type = searchParams.get("type") || "error";
    message = searchParams.get("message") || "Bir hata oluştu.";
    label = searchParams.get("label") || "Lütfen tekrar deneyiniz.";
    url = searchParams.get("url") || "/";
    buttonText = searchParams.get("buttonText") || "Ana Sayfa";
  } 


  const  [countDown, setCountDown] = useState(  remainingTime );


  // useCallback hook'u, fonksiyonu bellekte saklar ve
  // bağımlılıklarının değişmesi durumunda yeniden oluşturulmasını sağlar.
  // Bu, React'ta performansı artırmak için kullanılan bir tekniktir.
  const createQueryString = useCallback((name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  
  // içine gönderilen saniye kadar geri sayım sayacı çalışır.
  function startCountdown(seconds) {
    let countdownInterval = setInterval(() => {
      if (seconds <= -1) {
        clearInterval(countdownInterval);
        return;
      }
      setCountDown(seconds);

      // searchparams ve path yapısını buradan değiştiriyoruz
      // aşağıdaki kodun en önemli özelliği sayfayı yenilemeden url yapısını değiştirmesidir.
      // createQueryString -> parametredeki değeri değiştirir.
      window.history.pushState({}, '', `${pathname}?${createQueryString('remainingTime', seconds)}`)
      --seconds;
      --remainingTime;
    }, 1000);
  }
  

  useEffect(() => {
    // sayfa her render olduğunda fonksiyonu çalıştırır.
    startCountdown(countDown-1);
  }, [])
  

  
  
  return (
    
    <div className={`absolute w-full h-full flex flex-col items-center text-xl justify-center select-none
    ${type == "info" && "bg-blue-500"}
    ${type == "error" && "bg-red-500"}
    ${type == "success" && "bg-green-500"}
    ${type == "warning" && "bg-yellow-500"}
    `}>
      <div className={`bg-white inline-block rounded shadow-lg py-6`}>
        
        <div className='flex flex-col justify-center items-center '>
            
              {type == "info" && <MdCircleNotifications size={80}  className='text-blue-500'/>}
              {type == "error" && <MdOutlineErrorOutline size={80}  className='text-red-500'/>}
              {type == "success" && <MdDone size={80}  className='text-green-500'/>}
              {type == "warning" && <MdWarningAmber size={80}  className='text-yellow-500'/>}

          <div className={
            `w-full flex justify-start flex-col py-4 px-6 my-6 gap-2
            ${type == "info" && "bg-blue-100"}
            ${type == "error" && "bg-red-100"}
            ${type == "success" && "bg-green-100"}
            ${type == "warning" && "bg-yellow-100"}
          `}>
            
            <h3 className=' font-bold text-xl'>{label}</h3>
            <p className={`
            ${type == "info" && "text-blue-500"}
            ${type == "error" && "text-red-500"}
            ${type == "success" && "text-green-500"}
            ${type == "warning" && "text-yellow-500"}
            `}>{`${countDown ? (message + " " +  countDown + " saniye sonra tekrar deneyiniz") : message } `}</p>
          </div>
        </div>
        <div className={`w-full flex justify-center items-center`}>
          <Link href={`${countDown <= 0 ? url : "/"}`}>
          <button className={`hover:bg-black hover:scale-110 transition-all p-4 rounded text-white shadow
          ${countDown > 0 && "bg-gray-500 opacity-30 hover:scale-100 hover:bg-gray-500"}
          ${type == "info" && "bg-blue-500"}
          ${type == "error" && "bg-red-500"}
          ${type == "success" && "bg-green-500"}
          ${type == "warning" && "bg-yellow-500"}
          `} disabled={countDown > 0} >
            {`${buttonText}`}
          </button> 
          </Link>
        </div>
        
      </div>
     
    </div>
  )
}
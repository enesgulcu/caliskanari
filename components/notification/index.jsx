import React from 'react'
import {MdDone, MdWarningAmber, MdCircleNotifications } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";
import Link from 'next/link';

let color =  "gray-700";
let icon = <MdCircleNotifications/>;

// url = yönlendirilecek sayfa
// label = başlık
// type = info, error, success, warning
// message = gösterilecek mesaj
// buttonText = buton yazısı

export default async function Notification(
  url="/",
  label="Bilgilendirme",
  type="info",
  message="bir hata oluştu lütfen tekrar deneyin",
  buttonText="Anasayfaya Git") 
{


  if(type  == "info"){
    color = "blue";
    icon = <MdCircleNotifications size={80}  className='text-blue-600' />
  }

  else if(type == "error"){
    color = "red";
    icon = <MdOutlineErrorOutline size={80}  className='text-red-500' />
  }
  else if(type == "success"){
    color = "green";
    icon = <MdDone size={80}  className='text-green-500' />
  }

  else if(type == "warning"){
    color = "yellow";
    icon = <MdWarningAmber size={80}  className='text-yellow-500'/>
  }

  return (
    <div className={`bg-${color}-500 absolute w-full h-full flex flex-col items-center text-xl justify-center select-none`}>
      <div className={`bg-white inline-block rounded shadow-lg py-6`}>
        
        <div className='flex flex-col justify-center items-center '>
            {icon}
          <div className={`w-full flex justify-start flex-col bg-${color}-50 py-4 px-6 my-6`}>
            <h3 className=' font-bold text-xl'>{label}</h3>
            <p className={`text-${color}-500`}>{message}</p>
          </div>
        </div>
        <div className='w-full flex justify-center items-center'>
          <Link href={url}>
          <button className={`bg-${color}-500 hover:bg-black hover:scale-110 transition-all p-4 rounded text-white shadow`}>
            {buttonText}
          </button> 
          </Link>
        </div>
        
      </div>
     
    </div>
  )
}
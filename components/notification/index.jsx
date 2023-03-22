import React from 'react'
import {MdDone, MdWarningAmber, MdCircleNotifications } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";
import Link from 'next/link';

let color =  "green";
let icon = <MdCircleNotifications/>;

// url = yönlendirilecek sayfa
// label = başlık
// type = info, error, success, warning
// message = gösterilecek mesaj
// buttonText = buton yazısı

export default async function Notification({type, message, label, url, buttonText}) 
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

            
          <div className={`w-full flex justify-start flex-col py-4 px-6 my-6
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
            `}>{message}</p>
          </div>
        </div>
        <div className='w-full flex justify-center items-center'>
          <Link href={url}>
          <button className={`hover:bg-black hover:scale-110 transition-all p-4 rounded text-white shadow
          ${type == "info" && "bg-blue-500"}
          ${type == "error" && "bg-red-500"}
          ${type == "success" && "bg-green-500"}
          ${type == "warning" && "bg-yellow-500"}
          `}>
            {buttonText}
          </button> 
          </Link>
        </div>
        
      </div>
     
    </div>
  )
}
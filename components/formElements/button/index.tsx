"use client"
import React, {useState } from 'react';
import { MdArrowRight } from "react-icons/md";
import { RiArrowDropDownLine} from "react-icons/ri";

// YAPILACAKLAR: https://www.framer.com/motion/ EFEKTLERİ İLE DAHA EFEKTİF CSS YAZILACAK.

interface Props{
  children?: any
  text?: string
  icon?:any
  label?:string
  buttonDisabled?: boolean
  onClick?: () => void
}


// ...props dememizin sebebi: children harici gele nher şeyi props ismi altında al ve kullan.
const Button:React.FC<Props> = ({text="Button text", label="", icon, buttonDisabled=false, children=null}) => {

  const [dropdownIsActive, setDropdownIsActive] = useState<boolean>(false);

  return (  
    <div className={`${children ? "mt-[-2px]" : ""}`}> 
      {label && <label htmlFor={text + label} className='pl-2 px-1 border-b bg-secondary text-white border-gray-400 py-4 w-full block'>{label}</label>} 
      <button id={`${text + label}`} disabled={buttonDisabled} className={`px-2 h-12 flex w-full flex-row justify-between items-center text-secondary ${children ? "hover:bg-primary hover:text-white mt-[-2px]" : "hover:bg-secondary hover:text-white mb-2"}`} onClick={() => setDropdownIsActive(!dropdownIsActive)}>
        <div className='flex w-full flex-row items-center gap-2'>
          {!children && <MdArrowRight/>}
          {icon && <div>{icon}</div>}
          <div>{text}</div>
        </div>
        <div className={`${children ? 'block' : 'hidden'}`}>
          <RiArrowDropDownLine size={30} className={`${dropdownIsActive ? "rotate-0" : "-rotate-90"} transition-all`}/>
        </div>
      </button>
      <ul className={`${children && dropdownIsActive ? 'block' : 'hidden'} pl-4 transition-all`}>
        <li className='pl-2'>
          {children}
        </li>
      </ul>
    </div>
  )
}

export default Button

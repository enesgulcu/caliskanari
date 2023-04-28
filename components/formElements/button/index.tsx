"use client"
import React, {useState } from 'react';
import styles from './styles.module.css';
import { VscCircleFilled } from "react-icons/vsc";
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
const Button:React.FC<Props> = ({text="Button text", label, icon, buttonDisabled=false, children=null}) => {

  const [dropdownIsActive, setDropdownIsActive] = useState<boolean>(false);

  return (  
    <div className={`${children && "mb-4"}`}> 
      {label && <label htmlFor={text}>{label}</label>} 
      <button id={`${text}`} disabled={buttonDisabled} className={`flex w-full flex-row justify-between items-center mb-1 rounded text-secondary ${children ? "" : ""}`} onClick={() => setDropdownIsActive(!dropdownIsActive)}>
        <div className='flex w-full flex-row items-center gap-1'>
          {icon && <div>{icon}</div>}
          <div>{text}</div>
        </div>
        <div className={`${children ? 'block' : 'hidden'}`}>
          <RiArrowDropDownLine size={30} className={`${dropdownIsActive ? "rotate-0" : "-rotate-90"} transition-all`}/>
        </div>
      </button>
      <ul className={`${children && dropdownIsActive ? 'block' : 'hidden'} ml-4 transition-all`}>
        <li>
          {children}
        </li>
      </ul>
    </div>
  )
}

export default Button

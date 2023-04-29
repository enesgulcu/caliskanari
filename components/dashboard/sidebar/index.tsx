'use client'
import { useState } from 'react';
import Button from '@/components/formElements/button';
import Link from 'next/link';
import {VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import { AiFillHome } from "react-icons/ai";


const Sidebar:React.FC = () => {

  const [collapsedSidebar, setCollapsedSidebar] = useState<boolean>(false);
  console.log(collapsedSidebar)
  return (
    <div className='bg-white fixed max-w-[250px] w-full min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-y-auto'>
        {/* <button onClick={()=> setCollapsedSidebar(!collapsedSidebar)} className='absolute text-white font-bold right-0 bg-red-600 p-2 w-14 h-[55px]'>X</button> */}
        <ul>
          <li>
            <div className='border-t'>
              <Button text={"Deneme Yazısı 1"} icon={<AiFillHome/>} label="Anasayfa İşlemleri">
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
              </Button>
              <Button text={"Deneme Yazısı 2"} icon={<AiFillHome/>} label="Öğrenci İşlemleri">
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />


                <Button text={"Deneme Yazısı 2"} icon={<AiFillHome/>}>
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                </Button>


              </Button>
              <Button text={"Deneme Yazısı 2"} icon={<AiFillHome/>}>
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
              </Button>
              <Button text={"Deneme Yazısı 2"} icon={<AiFillHome/>} label="Öğretmen İşlemleri">
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />


                <Button text={"Deneme Yazısı 2"} icon={<AiFillHome/>}>
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                </Button>


              </Button>
              <Button text={"Deneme Yazısı 2"} icon={<AiFillHome/>}>
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
              </Button>
              <Button text={"Deneme Yazısı 2"} icon={<AiFillHome/>} label="Bayi İşlemleri">
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />


                <Button text={"Deneme Yazısı 2"} icon={<AiFillHome/>}>
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                </Button>


              </Button>
              <Button text={"Deneme Yazısı 2"} icon={<AiFillHome/>}>
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} />
              </Button>
                
            </div>
          </li>
        </ul>
    </div>
  ) 
}

export default Sidebar
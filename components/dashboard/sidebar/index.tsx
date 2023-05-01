'use client'
import { useState } from 'react';
import Button from '@/components/formElements/button';
import Link from 'next/link';
import { CgMenu } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import Image from 'next/image'


const Sidebar:React.FC = () => {

  const [collapsedSidebar, setCollapsedSidebar] = useState<boolean>(false);

  return (
    <div onClick={()=> collapsedSidebar && setCollapsedSidebar(!collapsedSidebar)} className={`${collapsedSidebar ? "absolute -left-[205px]" : "block"} max-w-full`}>
      <div className={` ${collapsedSidebar ? "bg-primary" : "bg-white"} fixed max-w-[250px] w-full min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-y-auto`}>
                  
                  <div onClick={()=> setCollapsedSidebar(!collapsedSidebar)} className={`${collapsedSidebar ? "bg-primary" : "bg-secondary"} cursor-pointer w-full  h-12 flex justify-between p-2 items-center`}>
                    <div className=' text-white font-bold'>YÖNETİCİ PANELİ</div>
                    <button onClick={()=>setCollapsedSidebar(!collapsedSidebar)} className='hover:scale-110 transition-all'><CgMenu color='white' size={25}/></button>
                  </div>
                  <div className='flex justify-between flex-col content-between w-full min-h-[calc(100vh-130px)]'>
                    <div className={`${collapsedSidebar ? "hidden" : "block"} pl-1`}>
                    <Button text={"Deneme Yazısı 1"} icon={<AiFillHome/>}>
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} icon={<AiFillHome/>}/>
                    <Button text={"Deneme Yazısı 1"} icon={<AiFillHome/>}>
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} icon={<AiFillHome/>}/>
                    <Button text={"Deneme Yazısı"} icon={<AiFillHome/>}/>
                    <Button text={"Deneme Yazısı"} icon={<AiFillHome/>}/>
                    <Button text={"Deneme Yazısı"} />
                    </Button>
                    <Button text={"Deneme Yazısı"} />
                    </Button> 
                    <Button text={"Deneme Yazısı 1"} icon={<AiFillHome/>}>
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    </Button>
                    <Button text={"Deneme Yazısı 1"} icon={<AiFillHome/>}>
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    </Button>
                    </div>
                    <div className='flex flex-col gap-4 justify-center items-center content-center border-t-2 pt-2'>
                    <Image src={'/logo.png'} width={80} height={80} alt={'logo'}/>
                    {process.env.NEXT_PUBLIC_URL}
                    </div>
                  </div>
                  
      </div>            
    </div>
  ) 
}

export default Sidebar
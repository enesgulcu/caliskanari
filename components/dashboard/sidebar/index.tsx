'use client'
import { useState } from 'react';
import Button from '@/components/formElements/button';
import Link from 'next/link';
import {VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import { AiFillHome } from "react-icons/ai";

const Sidebar:React.FC = () => {

  return (
    <div className='bg-white fixed max-w-[200px] w-full min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-y-scroll '>
        <ul className='w-full'>
          <li>
            <div className='border-t px-2'>
              <Button text={"Deneme Yazısı"} icon={<AiFillHome/>} label="Menü Başlığı 1">
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
              </Button>
              <Button text={"Deneme Yazısı"} icon={<AiFillHome/>} label="Menü Başlığı 2">
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                  <Button text={"Deneme Yazısı"} icon={<AiFillHome/>}>
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                    <Button text={"Deneme Yazısı"} />
                
                  </Button>
              </Button>
              <Button text={"Deneme Yazısı"} icon={<AiFillHome/>} label="Menü Başlığı 3">
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
                <Button text={"Deneme Yazısı"} />
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
'use client'
export const dynamic = 'force-dynamic'

import React,{useState, useEffect} from 'react'
import {getAPI} from "@/services/fetchAPI";
import TimeCountDown from  "@/components/other/timeCountDown";

interface dataProps {
  startBannerTime?: string,
  endBannerTime?: string,
  mainText?: string,
  detailText?: string,
  isActive?: boolean,

  mainTextColor?: string,
  underTextColor?: string,
  buttonColor?: string,
  backgroundColor?: string,

  error?:any
}

const GeneralTopPageBanner  = () => {

  // veri tabanından banner için gelen verileri içinde tutar.
  const [data, setData] = useState<dataProps>();

  const datafetch =  () => {
    getAPI("/other/generalTopPageBanner").then((res) => {
      if(res){
        const myData = res.data[0]
      
      if(myData){
        const futureDate =  new Date(myData.startBannerTime); // başlangıç tarihini kontrol etme
        const currentDate = new Date();
        if(futureDate <= currentDate){ // başlangıç tarihi gelmişse ve geçmişse aktif et!
          setData(myData);
      }}
    }
    })
    
}

  useEffect(() => {

    datafetch();

  }, [])

  useEffect(() => {

    

  }, [data])
  
  
  if(data != undefined && data  && data.isActive){  
    return (
    <>
      <TimeCountDown data={data}/>
    </>  
    )
  }
  else{
    return(
      <div className='hidden p-0 m-0 opacity-0'>
      </div>
    )
  }
  
  
}

export default GeneralTopPageBanner;

'use client'
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

  const datafetch = async () => {
    const {data} = await getAPI("/other/generalTopPageBanner"); // veri tabanından verileri alma

    const futureDate =  new Date(data[0].startBannerTime); // başlangıç tarihini kontrol etme
    const currentDate = new Date();
    if(futureDate <= currentDate){ // başlangıç tarihi gelmişse ve geçmişse aktif et!
      setData(data[0]);
  }}

  useEffect(() => {

    datafetch();

  }, [])

  useEffect(() => {

    

  }, [data])
  
  
  if(data && data.isActive){  
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

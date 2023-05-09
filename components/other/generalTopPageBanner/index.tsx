'use client'
export const dynamic = 'force-dynamic'

import React,{useState, useEffect} from 'react'
import {getAPI} from "@/services/fetchAPI";
import TimeCountDown from  "@/components/other/timeCountDown";
import Link from 'next/link';

interface dataProps {
  startBannerTime?: string,
  endBannerTime?: string,
  mainText?: string,
  detailText?: string,
  isActive?: boolean,

  mainTextColor?: string,
  underTextColor?: string,
  buttonColor?: string,
  buttonTextColor?: string,
  backgroundColor?: string,

  buttonLink?: string,
  buttonText?: string,


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
  
  if(data != undefined && data  && data.isActive){  
    console.log(data);

    return (
      <div
        style={{ background: data.backgroundColor && data.backgroundColor }}
        className={`w-full flex flex-row gap-4 md:gap-6 lg:gap-8 flex-wrap  justify-center p-4 items-center ${
          !data.backgroundColor && "bg-blue-200"
        }`}
      >
        <div className="h-full scale-75 md:scale-90 lg:scale-100">
          <TimeCountDown data={data} />
        </div>
        <div className="h-full flex justify-center flex-col items-center px-4 hover:scale-[102%] transition-all">
          <h2
            style={{ fontFamily: "Dekko, cursive", color: data.mainTextColor }}
            className={`${
              !data.mainTextColor && "text-secondary"
            } font-bold text-sm md:text-xl text-center tracking-wider`}
          >
            {data.mainText}
          </h2>

          <p
            style={{ fontFamily: "Dekko, cursive", color: data.underTextColor }}
            className={`${
              !data.underTextColor && "text-secondary"
            } text-xs md:text-lg text-center`}
          >
            {data.detailText}
          </p>
        </div>

        <div className="h-full">
          <Link href={data.buttonLink ? data.buttonLink : "/"}>
            <button style={{ background: data.buttonColor ? data.buttonColor : "white", fontFamily: "Dekko, cursive",
            color: data.buttonTextColor && data.buttonTextColor
          }}
              className={`${!data.buttonTextColor && "text-secondary"}
              px-4 py-2 rounded-xl hover:rotate-6 border border-primarydark transition-all`}
            >
              {data.buttonText ? data.buttonText : "Daha Fazla"}
            </button>
          </Link>
        </div>

      </div>
    );
  }
  else{
    return(
      <>
      </>
    )
  }
  
  
}

export default GeneralTopPageBanner;

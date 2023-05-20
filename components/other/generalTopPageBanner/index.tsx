'use client'
import TimeCountDown from  "@/components/other/timeCountDown";
import React,{useState, useEffect} from 'react'
import {getAPI} from "@/services/fetchAPI";
import Link from 'next/link';
import NewSystemDataProcess from "@/functions/other/regularCheckSystemData/newSystemDataProcess";

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

const GeneralTopPageBanner  = (allDataPanel:any, isDashboard:boolean) => {

  // veri tabanından banner için gelen verileri içinde tutar.
  const [data, setData] = useState<dataProps>();

  const datafetch  = async () => {

        // verileri (cookie | localstorage | database) yönetimini sağlayan fonksiyon
        //(database ismi | cookie veya localstorage ismi | api url)
        const {data} = await NewSystemDataProcess("GeneralTopPageBanner", "cookie", "cookie", "/other/generalTopPageBanner");
      if(data){
        const futureDate =  new Date(data.startBannerTime); // başlangıç tarihini kontrol etme
        const currentDate = new Date();
        if(futureDate <= currentDate){ // başlangıç tarihi gelmişse ve geçmişse aktif et!
          setData(data);
      }}
    
}
  useEffect(() => {

    datafetch();

  }, [])


  useEffect(() => {
    // bu bölüm admin panelinden veriler gelirse anlık olarak görebilmesini sağlamak amacı ile yapıldı. kullanıcı için değildir! admin için işlev görür!
    if(data && allDataPanel && allDataPanel.isDashboard){
      setData(allDataPanel.allDataPanel);
    }
  }, [allDataPanel])
  
  
  if(data != undefined && data  && data.isActive){  
    return (
      <div
        style={{ background: data.backgroundColor && data.backgroundColor }}
        className={`w-full flex flex-row gap-4 md:gap-6 lg:gap-8 flex-wrap  justify-center p-4 items-center ${
          !data.backgroundColor && "bg-blue-200"
        }`}
      >
        <div className="p-2 text-secondary bg-white absolute right-0 top-0">X</div>
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

        <div className={`h-full ${!data.buttonText && "hidden absolute opacity-0 -z-50"} ${data.buttonText == "" && "hidden absolute opacity-0 -z-50"} ${data.buttonText == " " && "hidden absolute opacity-0 -z-50"}`}>
          <Link passHref={true} href={data.buttonLink ? data.buttonLink : process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "/" }>
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

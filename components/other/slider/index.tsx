"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import NewSystemDataProcess from "@/functions/other/regularCheckSystemData/newSystemDataProcess";
import Link from 'next/link';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

// import required modules
import { Pagination, Navigation } from "swiper";

// Bu component slider için kullanılır.
// Verileri veri tabanından çeker ve LocalStorage veya Cookie içine kaydeder.

// targetDatabaseUrl -> verilerin çekileceği veri tabanı adresi
const Slider =  ({targetDatabaseUrl}:{targetDatabaseUrl:string}) => {

  const [sliderData, setSliderData] = useState<any>([
    {
      mainText:"Lorem  mattis, pulvinar dapibus leo.",
      mainTextColour: "rgb(255 255 255)",
      
      subText:"Lorem  mattis, pulvinar dapibus leo.",
      subTextColour: "rgb(255 255 255)",

      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",

      mainImage: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",

      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: false,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: true,

      bgColor: "rgba(0,0,0,0.5)",

      // standart image size
      bgImage: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",


    },
    {
      mainText:"Lorem  mattis, pulvinar dapibus leo.",
      mainTextColour: "rgb(255 255 255)",
      
      subText:"Lorem  mattis, pulvinar dapibus leo.",
      subTextColour: "rgb(255 255 255)",

      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",

      mainImage: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",

      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: false,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: true,

      bgColor: "rgba(0,0,0,0.5)",

      // standart image size
      bgImage: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",


    },
    {
      mainText:"ÇALIŞKAN ARI İLE DEV KAMPANYA!",
      mainTextColour: "rgb(255 255 255)",
      
      subText:"Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.",
      subTextColour: "rgb(255 255 255)",

      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",

      mainImage: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",

      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: false,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: true,

      bgColor: "rgba(0,0,0,0.5)",

      // standart image size
      bgImage: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1554088559-b9c59b87915a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",

    },

  ]);


  useEffect(() => {

      datafetch();
  }, []);





  const datafetch = async () => {

    const {data} = await NewSystemDataProcess(targetDatabaseUrl, "localStorage", "localStorage", "/other/slider");
    if(data) {
      setSliderData(data);
    }
}



  // ekran genişliği tablet ve üstü ise sliderı çalıştır.
  if(sliderData) {
    return (
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {sliderData &&  sliderData.map((item:any, index:number) => {
            return (

              <SwiperSlide key={index}>
                <div className={`relative w-full`}>
                  { 
                    item.bgImageOpen && 
                    <div className={`${item.backgrounBlur && "blur-0 lg:blur lg:scale-105"}`}>
                      <Image width={800} height={200} src={ item.bgImage6Xl} alt={item.title} className={`hidden 4xl:block w-full relative lg:absolute`}/>
                      <Image width={800} height={200} src={ item.bgImage4Xl} alt={item.title} className={`hidden 2xl:block 4xl:hidden w-full relative lg:absolute`}/>
                      <Image width={800} height={200} src={ item.bgImage2Xl} alt={item.title} className={`hidden xl:block  2xl:hidden w-full relative lg:absolute`}/>
                      <Image width={800} height={200} src={ item.bgImageXl}  alt={item.title} className={`hidden lg:block  xl:hidden  w-full relative lg:absolute`}/>
                      <Image width={800} height={200} src={ item.bgImageMd}  alt={item.title} className={`hidden md:block  lg:hidden  w-full relative md:absolute`}/>
                      <Image width={800} height={200} src={ item.bgImage}    alt={item.title} className={`          block  md:hidden  w-full relative lg:absolute`}/>
                    <div className={`
                    ${item.bgDarkness && "w-full lg:h-screen bg-black bg-opacity-40 relative lg:absolute "}
                    `}></div>
                    </div>
                  }
                   
                    <div className={`hidden lg:flex  relative w-full gap-4 p-6 px-8  flex-nowrap items-center h-[400px] 
                    ${item.changePosition ? "flex-row-reverse" : "flex-row" /* eğer yön değişikliği varsa */}
                    ${item.mainImage && item.mainImageOpen  ? "justify-around" : "justify-start"}
                    `}>
                      <div className={`${item.mainImage && item.mainImageOpen  ? "max-w-[50%]" : "max-w-[90%]"} px-6  flex flex-col gap-2 justify-center items-center`}>
                        {
                          item.mainText && item.MainTextOpen &&
                          <div>
                            <h4 style={{color:item.mainTextColour}} className={`text-sm md:text-lg lg:text-2xl font-semibold ${item.MainTextOpen && "block"}`}>{item.mainText}</h4>
                          </div>
                        }
                        {
                          item.subText && item.subTextOpen &&
                          <div>
                            <p style={{color:item.subTextColour}} className={`text-xs md:text-md lg:text-lg ${item.subTextOpen && "block"}`}>{item.subText}</p>
                          </div>
                        }
                        {
                          item.buttonOpen &&
                          <div>
                            <Link href={item.buttonLink}>
                              <button style={{background:item.buttonColour, color:item.buttonTextColour}} className="p-2  rounded-2xl font-bold m-2 hover:rotate-6 transition-all">{item.buttonText}</button>
                            </Link>
                          </div>
                        }
                      </div>
                      {item.mainImage && item.mainImageOpen &&
                      <div className=" max-w-[50%]  p-4 my-2">
                        <div>
                          <Image width={800} height={200} className=" h-full max-w-full max-h-[400px] lg:p-6 hover:scale-105 transition-all" src={item.mainImage} alt="resim" />
                        </div>
                      </div>
                      }

                      
                  </div>
                  
                  
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </>
    );
  }
  else{
    return(
      <div className="hidden p-0 m-0 h-0 w-0 z-20 absolute">  
      </div>
    )
  }

}

export default Slider;
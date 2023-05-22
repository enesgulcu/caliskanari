"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import NewSystemDataProcess from "@/functions/other/regularCheckSystemData/newSystemDataProcess";
import Link from 'next/link';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

// Bu component slider için kullanılır.
// Verileri veri tabanından çeker ve LocalStorage veya Cookie içine kaydeder.

// targetDatabaseUrl -> verilerin çekileceği veri tabanı adresi
const Slider =  ({targetDatabaseUrl}:{targetDatabaseUrl:string}) => {

  const [width, setWidth] = useState<any>();
  const [sliderData, setSliderData] = useState<any>([
    {
      buttonLink: "/",
      buttonText: "Kampanyaya Git",

      // standart image size
      image: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for mobile
      imageMd: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for tablet
      imageLg: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for desktop
      imageXl: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for large desktop
      image2Xl: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for FULL HD
      image4Xl: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for 2K
      image6Xl: "https://images3.alphacoders.com/131/1313899.jpeg",


    },
    {
      buttonLink: "/",
      buttonText: "Kampanyaya Git",

      // standart image size
      image: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for mobile
      imageMd: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for tablet
      imageLg: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for desktop
      imageXl: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for large desktop
      image2Xl: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for FULL HD
      image4Xl: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for 2K
      image6Xl: "https://images3.alphacoders.com/131/1313899.jpeg",


    },
    {
      buttonLink: "/",
      buttonText: "Kampanyaya Git",

      // standart image size
      image: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for mobile
      imageMd: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for tablet
      imageLg: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for desktop
      imageXl: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for large desktop
      image2Xl: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for FULL HD
      image4Xl: "https://images3.alphacoders.com/131/1313899.jpeg",
      // image size for 2K
      image6Xl: "https://images3.alphacoders.com/131/1313899.jpeg",


    },

  ]);

  useEffect(() => {
      if(typeof window !== "undefined" && window.innerWidth){
          setWidth(window.innerWidth);
      }

      datafetch();
  }, []);


  const datafetch = async () => {

    const {data} = await NewSystemDataProcess(targetDatabaseUrl, "localStorage", "localStorage", "/other/slider");
    if(data) {
      setSliderData(data);
    }
}



  // ekran genişliği tablet ve üstü ise sliderı çalıştır.
  if((width > 640 || true) && sliderData) {
    return (
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
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
                <div className="w-full block overflow-hidden max-h-[500px]">

                  <img src={
                    // image size for 2K
                    width > 2560 && item.image6Xl ? item.image6Xl :
                    // image size for FULL HD
                    width > 1920 && item.image4Xl ? item.image4Xl :
                    // image size for large desktop
                    width > 1536 && item.image2Xl ? item.image2Xl :
                    // image size for desktop
                    width > 1280 && item.imageXl ? item.imageXl :
                    // image size for tablet
                    width > 1024 && item.imageLg ? item.imageLg :
                    // image size for mobile
                    width > 768 && item.imageLg ? item.imageMd :
                    // standart image size
                    item.image && item.image

                  } alt={item.title} className="w-full "/>


                    <div className="slider-item-content absolute top-0 left-0">
                      <Link href={item.buttonLink}>
                        <button>{item.buttonText}</button>
                      </Link>
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
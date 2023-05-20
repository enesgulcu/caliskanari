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


const Slider =  (targetDatabaseUrl:string = "mainSlider") => {

  const [width, setWidth] = useState<any>();
  const [sliderData, setSliderData] = useState<any>([
    {
      buttonLink: "/",
      buttonText: "Kampanyaya Git",

      // standart image size
      image: "https://soliloquywp.com/wp-content/uploads/2018/11/nb_ist_cover.jpg",
      // image size for mobile
      imageMd: "https://soliloquywp.com/wp-content/uploads/2018/11/nb_ist_cover.jpg",
      // image size for tablet
      imageLg: "https://soliloquywp.com/wp-content/uploads/2018/11/nb_ist_cover.jpg",
      // image size for desktop
      imageXl: "https://soliloquywp.com/wp-content/uploads/2018/11/nb_ist_cover.jpg",
      // image size for large desktop
      image2Xl: "https://soliloquywp.com/wp-content/uploads/2018/11/nb_ist_cover.jpg",
      // image size for FULL HD
      image4Xl: "https://soliloquywp.com/wp-content/uploads/2018/11/nb_ist_cover.jpg",
      // image size for 2K
      image6Xl: "https://soliloquywp.com/wp-content/uploads/2018/11/nb_ist_cover.jpg",
      

    },
    {
      buttonLink: "/",
      buttonText: "Kampanyaya Git",

      // standart image size
      image: "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
      // image size for mobile
      imageMd: "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
      // image size for tablet
      imageLg: "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
      // image size for desktop
      imageXl: "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
      // image size for large desktop
      image2Xl: "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
      // image size for FULL HD
      image4Xl: "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
      // image size for 2K
      image6Xl: "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",

      
    },
    {
      buttonLink: "/",
      buttonText: "Kampanyaya Git",

      // standart image size
      image: "https://wowslider.com/sliders/demo-18/data1/images/new_york.jpg",
      // image size for mobile
      imageMd: "https://wowslider.com/sliders/demo-18/data1/images/new_york.jpg",
      // image size for tablet
      imageLg: "https://wowslider.com/sliders/demo-18/data1/images/new_york.jpg",
      // image size for desktop
      imageXl: "https://wowslider.com/sliders/demo-18/data1/images/new_york.jpg",
      // image size for large desktop
      image2Xl: "https://wowslider.com/sliders/demo-18/data1/images/new_york.jpg",
      // image size for FULL HD
      image4Xl: "https://wowslider.com/sliders/demo-18/data1/images/new_york.jpg",
      // image size for 2K
      image6Xl: "https://wowslider.com/sliders/demo-18/data1/images/new_york.jpg",

      
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
  if(width > 640 && sliderData) {
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
                <div className="w-full h-full block relative overflow-hidden max-h-72">

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

                  } alt={item.title} className="object-contain w-full h-full m-auto"/>

                  <div className="slider-item-content absolute w-full h-full top-0">
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
  
}

export default Slider;


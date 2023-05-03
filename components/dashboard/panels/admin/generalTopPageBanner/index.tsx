import React, { useState } from "react";
import { Formik, Form } from "formik";
import { HexColorPicker } from "react-colorful";


//import calculateTime from "@/functions/other/calculateTime"

const GeneralTopPageBanner: React.FC = () => {

  
  const [color, setColor] = useState("#c5d2de");
  const [mainTextColor, setMainTextColor] = useState("#c5d2de");
  const [underTextColor, setUnderTextColor] = useState("#c5d2de");
  const [buttonColor, setButtonColor] = useState("#c5d2de");
  const [backgroundColor, setBackgroundColor] = useState("#c5d2de");

  //const {months, days, hours, minutes, seconds} = calculateTime(time);


  // bu günün tarihini string ifadeye çevirir.
  const formattedDate = () => {
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate;
  };

  // Arkaplan rengi, arkaplan resmi veya arkaplan videosu
  // ay, gün, saat, dakika, saniye geri sayımı yapan yapı (takvimden seçilen tarihe göre)
  // paragraf yazısı - yazının rengi -
  // button - butonun gideceği adres - butonun yazısı - butonun rengi - butonun ikonu - butonun ikonunun rengi
  return (
    <div className={`w-full rounded shadow px-4 bg-[#c5d2de]  sm:px-20 py-6`}>
      <Formik
        // input verileri
        initialValues={{
          color: color,
          startBannerTime: "",
          endBannerTime: "",
          mainText: "",
          detailText:"",
          isActive: false,

          mainTextColor: mainTextColor,
        }}
        // input check
        //validationSchema={ValidationSchema}

        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            
            <div className="flex flex-col w-full sm:max-w-[750px] mx-auto">
            <div className="w-full p-4 flex bg-secondary rounded justify-center items-center">
              <label className="text-white font-bold text-4xl">Genel Duyuru Paneli</label>
            </div>
            {/* SUBMIT BUTTON */}
            <div className="w-full flex justify-center items-center content-center">
                <button
                  className={`bg-secondary hover:bg-primary hover:scale-110 transition-all block w-48 px-4 py-4 mt-4 text-md font-medium text-center text-white  border border-transparent rounded-lg focus:shadow-outline-blue`}
                  type="submit">
                  Ayarları kaydet
                </button>
              </div>

            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-x-4">
              {/* BANNER START TIME */}
              <div className=" shadow w-full p-2 rounded-xl bg-white flex flex-col justify-center items-center mt-4 sm:mt-4">
                <label className="mb-2 block text-center text-xl">Başlangıç Tarihi</label>
                <div className="relative bg-white w-60 rounded shadow border-gray-200 border">
                  <input
                    type="datetime-local"
                    className=" bg-white w-full rounded  border-secondary p-2 text-lg text-secondary"
                    name="startBannerTime"
                    onChange={(e) => props.handleChange({ target: { name: 'startBannerTime', value: e.target.value } })}
                    min={formattedDate()}
                  />
                </div>
              </div>

              {/* BANNER END TIME */}
              <div className=" shadow w-full p-2 rounded-xl bg-white flex flex-col justify-center items-center mt-4 sm:mt-4">
                <label className="mb-2 block text-center text-xl">Bitiş Tarihi</label>
                <div className="relative bg-white w-60 rounded shadow border-gray-200 border">
                  <input
                    type="datetime-local"
                    className=" bg-white w-full rounded  border-secondary p-2 text-lg text-secondary"
                    name="startBannerTime"
                    onChange={(e) => props.handleChange({ target: { name: 'startBannerTime', value: e.target.value } })}
                    min={formattedDate()}
                  />
                </div>
              </div>

              </div>


              {/* MAIN TEX TDETAIL TEXT */}
              <div className=" shadow p-2 rounded-xl bg-white mt-4 sm:mt-4 min-w-[200px] overflow-hidden">

              <label htmlFor="mainText" className="pl-4 block text-xl ">Ana Başlık</label>
                <input
                  id="mainText"
                  name="mainText"
                  autoComplete="off"
                  type="text"
                  onChange={props.handleChange}
                  placeholder="Ana Başlığınızı giriniz."
                  className="mb-4 shadow w-full px-4 py-2 text-md border rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />


              <label htmlFor="mainText" className="pl-4 block text-xl ">Alt Metin</label>
                <textarea
                  id="detailText"
                  name="detailText"
                  autoComplete="off"
                  onChange={props.handleChange}
                  placeholder="Alt başlığınızı giriniz."
                  className="resize overflow shadow max-w-full w-full px-4 py-2 text-md border rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* SWITCH BUTTON */}
              <div className=" shadow relative p-2 rounded-xl bg-white mt-4 sm:mt-4 min-w-[200px] overflow-hidden flex gap-6 justify-center items-center">
                <label className="block text-center text-xl my-2">Bu Yapı Aktif Olsun mu?</label>
                <div className="p-1 bg-gray-300 border-gray-500 shadow rounded-xl pl-2">
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    name="isActive"
                    onChange={props.handleChange}
                  />
                </div>
              </div>

              {/* COLOR OPTIONS */}
              <div className="bg-white mt-4 p-4 sm:mt-4 rounded-xl shadow ">
                  <HexColorPicker 
                  color={color} 
                  className="min-w-full px-2"
                  onChange={color => {setColor(color), props.handleChange({ target: { name: 'color', value: color } })}} />
                <div className="m-2 my-4 bg-gray-200 rounded p-2">
                <label className="block text-center text-secondary font-bold rounded">Dikkat! </label>
                <label className="block text-center text-secondary font-bold rounded">Yukarıda bulunan renk paletinden rengi seçtikten sonra</label>
                <label className="block text-center text-secondary font-bold rounded">aşağıdaki butona tıklayarak renk atamalarınızı yapabilirsiniz.</label>
               
                </div>
               <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                  
                  {/* Ana Başlık Rengi */}
                  <div className="sm:min-w-[350px] min-w-[150px] w-full sm:w-auto flex flex-row justify-between items-center border-gray-200 border-2 shadow p-4 gap-4 rounded-xl">
                    <label className="text-center">Ana Başlık Rengi</label>
                    <div style={{background:mainTextColor}} className="p-6 border-2 border-gray-200 rounded inline-block"></div>
                    <button
                      onClick={() => {setMainTextColor(color), props.handleChange({ target: { name: 'mainTextColor', value: color } })}}
                      className={`bg-gray-500 hover:bg-primary hover:scale-105 transition-all block px-2 py-2 text-center text-white  rounded-lg focus:shadow-outline-blue`}>
                      Rengi kaydet
                    </button>
                  </div>

                  {/* Alt Metin Rengi */}
                  <div className="sm:min-w-[350px] min-w-[150px] w-full sm:w-auto flex flex-row justify-between items-center border-gray-200 border-2 shadow p-4 gap-4 rounded-xl">
                    <label className="text-center">Alt Metin Rengi</label>
                    <div style={{background:underTextColor}} className="p-6 border-2 border-gray-200 rounded inline-block"></div>
                    <button
                      onClick={() => {setUnderTextColor(color), props.handleChange({ target: { name: 'underTextColor', value: color } })}}
                      className={`bg-gray-500 hover:bg-primary hover:scale-105 transition-all block px-2 py-2 text-center text-white  rounded-lg focus:shadow-outline-blue`}>
                      Rengi kaydet
                    </button>
                  </div>

                  {/* Buton Rengi */}
                  <div className="sm:min-w-[350px] min-w-[150px] w-full sm:w-auto flex flex-row justify-between items-center border-gray-200 border-2 shadow p-4 gap-4 rounded-xl">
                    <label className="text-center">Buton Rengi</label>
                    <div style={{background:buttonColor}} className="p-6 border-2 border-gray-200 rounded inline-block"></div>
                    <button
                      onClick={() => {setButtonColor(color), props.handleChange({ target: { name: 'buttonColor', value: color } })}}
                      className={`bg-gray-500 hover:bg-primary hover:scale-105 transition-all block px-2 py-2 text-center text-white  rounded-lg focus:shadow-outline-blue`}>
                      Rengi kaydet
                    </button>
                  </div>

                  {/* Arkaplan Rengi */}
                  <div className="sm:min-w-[350px] min-w-[150px] w-full sm:w-auto flex flex-row justify-between items-center border-gray-200 border-2 shadow p-4 gap-4 rounded-xl">
                    <label className="text-center">Arkaplan Rengi</label>
                    <div style={{background:backgroundColor}} className="p-6 border-2 border-gray-200 rounded inline-block"></div>
                    <button
                      onClick={() => {setBackgroundColor(color), props.handleChange({ target: { name: 'backgroundColor', value: color } })}}
                      className={`bg-gray-500 hover:bg-primary hover:scale-105 transition-all block px-2 py-2 text-center text-white rounded-lg focus:shadow-outline-blue`}>
                      Rengi kaydet
                    </button>
                  </div>
                </div>

              {/* SUBMIT BUTTON */}
              <div className="w-full flex justify-center items-center content-center">
                <button
                  className={`bg-secondary hover:bg-primary hover:scale-110 transition-all block w-48 px-4 py-4 mt-4 text-md font-medium text-center text-white  border border-transparent rounded-lg focus:shadow-outline-blue`}
                  type="submit">
                  Ayarları kaydet
                </button>
              </div>
              
              </div>            
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralTopPageBanner;

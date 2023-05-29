"use client";
import {postAPI, getAPI} from '@/services/fetchAPI/index';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { HexColorPicker } from "react-colorful";
import { useSession } from 'next-auth/react';
import ValidationSchema from './formikData';
import {notFound} from 'next/navigation';
import { Formik, Form } from "formik";

interface FormValues{
    mainText?: string;
    subText?: string;
    buttonText?: string;
    buttonLink?: string;

    mainImage?: string;
    bgImage?: string;
    bgImageMd?: string;
    bgImageLg?: string;
    bgImageXl?: string;
    bgImage2Xl?: string;
    bgImage4Xl?: string;
    bgImage6Xl?: string;

    subTextColour?: string;
    mainTextColour?: string;
    buttonColour?: string;
    buttonTextColour?: string;
    bgColor?: string;

    mainImageOpen: boolean;
    MainTextOpen: boolean;
    buttonOpen: boolean;
    subTextOpen: boolean;
    changePosition: boolean;
    backgrounBlur: boolean;
    bgImageOpen: boolean;
    bgDarkness: boolean;

    bgDarknessValue?:string;
  }

const Slider:React.FC = () => {

    const [mainText, setMainText] = useState<string>();
    const [subText, setSubText] = useState<string>();
    const [buttonText, setButtonText] = useState<string>();
    const [buttonLink, setButtonLink] = useState<string>();

    const [isActiveMainText, setIsActiveMainText] = useState<boolean>();
    const [isActiveSubText, setIsActiveSubText] = useState<boolean>();
    const [isActiveButtonText, setIsActiveButtonText] = useState<boolean>();

//###################################################################
// sayfa rol kontrolü - erişim olmaz ise notfound'a yönlendirir. ####

  const pageRole = "admin";

  const {data}:any= useSession();
  const user = data.user;
  
  if(!user || user.role != pageRole ){
    return notFound();
  }

//###################################################################
//###################################################################

  else{
    return (
        <>

            <div className={`w-full  rounded shadow px-4 bg-[#c5d2de]  sm:px-6 py-6`}>
                <ToastContainer
                    className="4xl:text-4xl min:w-40"
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />

                <Formik
                initialValues={{
                    role: pageRole, // admin -> panel kim içinse o tanımlanacak
                    mainText: "",
                    subText: "",
                    buttonText: "",
                    buttonLink: "",
                    mainImage: "",
                    bgImage: "",
                    bgImageMd: "",
                    bgImageLg: "",
                    bgImageXl: "",
                    bgImage2Xl: "",
                    bgImage4Xl: "",
                    bgImage6Xl: "",
                    subTextColour: "",
                    mainTextColour: "",
                    buttonColour: "",
                    buttonTextColour: "",
                    bgColor: "",
                    mainImageOpen: true,
                    MainTextOpen: true,
                    buttonOpen: true,
                    subTextOpen: true,
                    changePosition: true,
                    backgrounBlur: true,
                    bgImageOpen: true,
                    bgDarkness: true,
                    bgDarknessValue: "0.0"
                }}

                validationSchema={ValidationSchema}
                
                onSubmit={(values: FormValues) => {
                    postAPI("/dashboard/admin/slider", values)
                    .then((res) => {
                        if (res.status && (res.status === 200 || res.status === "success")) {
                        const timeOut = setInterval(() => {
                            // setIsloading(false);
                            clearInterval(timeOut);
                        }, 2000);
                        toast.success("Güncelleme işlemi başarılı!");
                        } else {
                        toast.error(res.error);
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message);
                    });
                }}
                >

                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        
                        <div className="flex flex-col w-full mx-auto min-h-screen">

                            <div className="w-full  p-4 flex bg-secondary rounded justify-center items-center">
                                <label className="text-white font-bold text-xl md:text-4xl">
                                    Slider Paneli
                                </label>
                            </div>

                            {/* buranın altında inputlar olacak */}
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>

                                <div className="flex flex-col flex-nowrap gap-8 shadow p-2 rounded-xl bg-white mt-6 sm:mt-6 min-w-[200px] overflow-hidden">
                                    

                                    
                                    {/* MAIN TEXT  START*/}
                                    <div className='flex justify-center items-end content-center gap-4'>
                                        
                                        {/* SWITCH BUTTON */}
                                        <div onClick={() => setIsActiveMainText(!isActiveMainText)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${isActiveMainText ? "bg-blue-400" : "bg-red-400"}`}>
                                            <input
                                                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                type="checkbox"
                                                name="isActiveMainText"
                                                checked={isActiveMainText ? isActiveMainText : false}
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                        name: "isActiveMainText",
                                                        value: e.target.checked,
                                                        },
                                                    });
                                                    setIsActiveMainText(e.target.checked);
                                                    }                                                
                                                }
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="mainText" className="pl-2 block text-xl ">
                                                Ana Başlık
                                            </label>
                                            <input
                                            id="mainText"
                                            name="mainText"
                                            autoComplete="off"
                                            type="text"
                                            value={mainText}
                                            onChange={(e)=>{
                                                props.handleChange({
                                                    target: {
                                                        name: "mainText",
                                                        value: e.target.value,
                                                    },
                                                });
                                                setMainText(e.target.value);
                                            }}
                                            placeholder="Ana başlığınızı giriniz."
                                            className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            />
                                        </div>    
                                        
                                    </div>
                                    {/* MAIN TEXT  END*/}




                                    {/* SUB TEXT  START*/}
                                    <div className='flex justify-center items-end content-center gap-4'>
                                        
                                        {/* SWITCH BUTTON */}
                                        <div  onClick={() => setIsActiveSubText(!isActiveSubText)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${isActiveSubText ? "bg-blue-400" : "bg-red-400"}`}>
                                            <input
                                                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                type="checkbox"
                                                name="isActiveSubText"
                                                checked={isActiveSubText ? isActiveSubText : false}
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                        name: "isActiveSubText",
                                                        value: e.target.checked,
                                                        },
                                                    });
                                                    setIsActiveSubText(e.target.checked);
                                                    }                                                
                                                }
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="mainText" className="pl-2 block text-xl ">
                                                Alt Açıklama Metni
                                            </label>
                                            <input
                                                id="subText"
                                                name="subText"
                                                autoComplete="off"
                                                type="text"
                                                value={buttonText}
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "subText",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setButtonText(e.target.value);
                                                }}
                                                placeholder="Alt açıklama yazınızı giriniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            />
                                        </div>
                                        
                                    </div>
                                    {/* SUB TEXT  END*/}

                                                    

                                    {/* BUTTON TEXT  START*/}
                                    <div className='flex justify-center items-end content-center gap-4'>
                                        {/* SWITCH BUTTON */}
                                        <div onClick={() => setIsActiveButtonText(!isActiveButtonText)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${isActiveButtonText ? "bg-blue-400" : "bg-red-400"}`}>
                                            <input
                                                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                type="checkbox"
                                                name="isActiveButtonText"
                                                checked={isActiveButtonText ? isActiveButtonText : false}
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                        name: "isActiveButtonText",
                                                        value: e.target.checked,
                                                        },
                                                    });
                                                    setIsActiveButtonText(e.target.checked);
                                                    }                                                
                                                }
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="buttonText" className="pl-2 mt-2 block text-xl">
                                                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                                                    <div className='flex min-w-[110px]'>Buton Metni</div><p className="text-xs">(Eğer burayı boş bırakırsanız buton gözükmeyecektir.)</p>
                                                </div>
                                            </label>
                                            <input
                                                id="buttonText"
                                                name="buttonText"
                                                autoComplete="off"
                                                type="text"
                                                value={subText}
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "buttonText",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setSubText(e.target.value);
                                                }}
                                                placeholder="Buton içinde yazacak olan yazıyı giriniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            />
                                        </div>
                                        
                                    </div>
                                    {/* BUTTON TEXT  END*/}



                                    {/* BUTTON LINK  START*/}
                                    <div>
                                        <label htmlFor="buttonLink" className="pl-2 mt-2 block text-xl my-2">
                                            <div className="flex flex-col flex-wrap md:flex-nowrap justify-start items-start">
                                            <div>Buton Bağlantı Adresi</div>
                                            <p className="text-xs">({`${process.env.NEXT_PUBLIC_URL && process.env.NEXT_PUBLIC_URL}/... #### örnek: ${process.env.NEXT_PUBLIC_URL && process.env.NEXT_PUBLIC_URL}/buraya_yazilan_adres/...`   })</p>
                                            </div>                                    
                                        </label>
                                        <input
                                        id="buttonLink"
                                        name="buttonLink"
                                        autoComplete="off"
                                        type="text"
                                        value={buttonLink}
                                        onChange={(e)=>{
                                            props.handleChange({
                                                target: {
                                                    name: "buttonLink",
                                                    value: e.target.value,
                                                },
                                            });
                                            setButtonLink(e.target.value);
                                        }}
                                        placeholder="https://www.caliskanari.com/.../..."
                                        className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        />
                                    </div>
                                    {/* BUTTON LINK  END*/}
                                    


                                </div>
                            </div>
                        </div>

                    </Form>
                )}
                </Formik>
            </div>      
        </>
      );
  }


}

export default Slider

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

            <div className={`w-full h-full rounded shadow px-4 bg-[#c5d2de]  sm:px-6 py-6`}>
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
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                
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

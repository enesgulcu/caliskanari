"use client";
import { Formik, Form } from "formik";
import forgotPasswordValidationSchema from "./formikData";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./forgotPassword.module.css";
import {postAPI} from "@/services/fetchAPI";
import Input from '@/components/formElements/input';
import ErrorText from '@/components/formElements/errorText';

export default function ForgotPasswordComponent() {

  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  return (
    <div className={styles.main}>
      <ToastContainer
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
        // input verileri
        initialValues={{          
          email: "",
        }}
        // input check
        validationSchema={forgotPasswordValidationSchema}

        onSubmit={(values) => {
            
            postAPI("/auth/forgotPassword", values.email).then(data => {
              
              if (data.status === "success") {
                  toast.success(data.message);
                  setIsLogin(true);

                  setTimeout(() => {
                    router.push('/');
                  }, 5000);

              } else {
                  toast.error(data.message);
              }
            })
          
        }}
      >

        {(props) => (
          <Form onSubmit={props.handleSubmit} className={`${isLogin ? "blur"  : ""} ${styles.main_container} md:scale-75 2xl:scale-100`} >
            
              <div className={styles.container}>
                <div className={styles.container_left_side}>
                  <img
                    className={styles.left_side_image}
                    src="https://source.unsplash.com/user/erondu/1600x900"
                    alt="img"
                  />
                </div>
                <div className={styles.container_right_side}>
                  <div className="w-full">
                    <div className={styles.right_side_logo}>
                      <div
                        className={styles.right_side_logoImage}
                        fill="none"
                        stroke="currentColor"
                      >
                        <Image
                          src="/logo.png"
                          width="150"
                          height="150"
                          alt="logo"
                        />
                      </div>
                    </div>
                    <h1 className="mb-4 mt-4 text-2xl font-bold text-center text-gray-700">
                      Şifre Sıfırlama
                    </h1>
                    <div className="mt-4">
                    <Input
                      labelValue='Email'
                      disabled={isLogin}
                      id='email'
                      name='email'
                      type='email'
                      value={props.values.email}
                      onChange={props.handleChange}
                      placeholder='Mail adresinizi giriniz.'
                    />
                    {props.touched.email &&
                      <ErrorText >
                        {props.errors.email}
                      </ErrorText>
                    }
                    </div>
                    <div className="w-full flex justify-center my-4">
                      <button
                        disabled={isLogin}
                        type='submit'
                        className={`${isLogin == true ? "bg-secondary" : "bg-primary hover:bg-primarydark"}  w-full text-white text-xl 4xl:text-6xl border rounded-md p-4 `}
                      >
                        Şifre Sıfırlama Maili Gönder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

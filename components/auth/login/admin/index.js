"use client";
import { Formik, Form } from "formik";
import adminValidationSchema from "./formikData";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./styles.module.css";
import Input from '@/components/formElements/input';
import ErrorText from '@/components/formElements/errorText';

// session: giriş yapmış kullanıcıyı temsil eder varsa bilgileri içinde barındırır.
// signIn:  kullanıcıyı giriş yapmaya yönlendirmek için kullanılır.
import { signIn } from "next-auth/react";

export default function AdminLoginComponent() {

  const [isAccessing, setIsAccessing] = useState(false);

  const router = useRouter();

  return (
    <div className={styles.main}>
      <ToastContainer
        position="top-right"
        autoClose={4000}
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
          password: "",
        }}
        // input check
        validationSchema={adminValidationSchema}

        onSubmit={(values) => {

          // signIn içine hangi provider ile giriş yapılacağı ve giriş bilgileri gönderilir.
          const result = signIn('credentials', {
            email: values.email,
            password: values.password,
            role: "Admin",
            callbackUrl:"/", 
            redirect: false, 
          });

          result.then((res) => {
            if(res.ok){
              
              setIsAccessing(true);

              toast.success("Giriş Başarılı (Yönlendiriliyorsunuz...)")
              const timeOut = setInterval(() => {
                router.push('/');
                clearInterval(timeOut);
              }, 3000);
            }
            else{
              toast.error("Girdiğiniz bilgiler hatalıdır. Lütfen kontrol edip tekrar deneyiniz.")
            }
          })
          
        
        }}
      >

        {(props) => (
          <Form onSubmit={props.handleSubmit} className={`${isAccessing ? "blur"  : ""} ${styles.main_container}`} >
            
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
                          priority={true}
                        />
                      </div>
                    </div>
                    
                    <h1 className="mb-4 mt-4 text-2xl font-bold text-center text-gray-700">
                      Admin Giriş
                    </h1>

                    <div className="mt-4">
                    <Input
                      labelValue='Email'
                      disabled={isAccessing}
                      id='email'
                      name='email'
                      type='text'
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

                    <div>
                      <Input
                        labelValue='Şifre'
                        disabled={isAccessing}
                        id='password'
                        name='password'
                        type='password'
                        value={props.values.password}
                        onChange={props.handleChange}
                        placeholder='******'
                      />
                      {props.touched.password &&
                      <ErrorText >
                        {props.errors.password}
                      </ErrorText>
                      }
                    </div>
                    
                    <button
                      disabled={isAccessing}
                      className={`${isAccessing ? "bg-gray-600 active:bg-gray-600 hover:bg-gray-600" : "bg-blue-600 active:bg-blue-600 hover:bg-blue-700"} block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150  border border-transparent rounded-lg  focus:outline-none focus:shadow-outline-blue`}
                      href="#"
                    >
                      Giriş Yap
                    </button>

                  </div>
                </div>
              </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

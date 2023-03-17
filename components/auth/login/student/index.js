"use client";
import { Formik, Form } from "formik";
import studentValidationSchema from "./formikData";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./login.module.css";
import Link from "next/link";

// session: giriş yapmış kullanıcıyı temsil eder varsa bilgileri içinde barındırır.
// signIn:  kullanıcıyı giriş yapmaya yönlendirmek için kullanılır.
import { signIn } from "next-auth/react";

export default function LoginComponent({pageRole}) {

  const [mailIsNotVerify , setMailIsNotVerify] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

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
          activationCode: ""
        }}
        // input check
        validationSchema={studentValidationSchema}

        onSubmit={(values) => {

          // signIn içine hangi provider ile giriş yapılacağı ve giriş bilgileri gönderilir.
          const result = signIn('credentials', {
            email: values.email,
            password: values.password,
            role: pageRole,
            callbackUrl:"/", 
            redirect: false, 
          });
          
          result.then((res) => {
            
            if(res.ok){
              
              setIsLogin(true);

              toast.success("Giriş Başarılı (Yönlendiriliyorsunuz...)")
              const timeOut = setInterval(() => {
                router.push('/');
                clearInterval(timeOut);
              }, 3000);
            }
            else{
              if(!res.verfyEmail && !res.verfyEmail != undefined){
                setMailIsNotVerify(true);
                setIsLogin(true);
              }
              toast.error(res.error);
            }
          })
          
        
        }}
      >

        {(props) => (
          <Form onSubmit={props.handleSubmit} className={`${isLogin ? "blur"  : ""} ${styles.main_container}`} >
            
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
                      Öğrenci Giriş
                    </h1>
                    <div className="mt-4">
                      <label className="block text-sm">Email</label>
                      <input
                      id='email'
                      name='email'
                      autoComplete='off'
                      type='email'
                      value={props.values.email}
                      onChange={props.handleChange}
                      placeholder="Mail adresinizi giriniz."
                      className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block mt-4 text-sm">Şifre</label>

                      <input 
                        id='password'
                        name='password'
                        type='password'
                        value={props.values.password}
                        onChange={props.handleChange}
                        placeholder="******"
                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block mt-4 text-sm">
                        Aktivasyon Kodu
                      </label>

                      <input                   
                        id='name'
                        name='name'
                        type='text'
                        value={props.values.activationCode}
                        onChange={props.handleChange}
                        placeholder='İsminizi giriniz.'
                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
        {/* isLogin */}
                    </div>
                    <button
                    disabled={isLogin}
                      className={`${isLogin ? "bg-gray-600 active:bg-gray-600 hover:bg-gray-600" : "bg-blue-600 active:bg-blue-600 hover:bg-blue-700"} block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150  border border-transparent rounded-lg  focus:outline-none focus:shadow-outline-blue`}
                      href="#"
                    >
                      Giriş Yap
                    </button>

                    <div className="mt-4 text-center">
                    <p className="text-md">
                    Kayıtlı hesabınız yok mu?<Link href={`/auth/register/${pageRole}`} className="text-blue-600 hover:underline"> Öğrenci Kayıt.</Link>
                    </p>
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

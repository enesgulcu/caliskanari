"use client";
import { Formik, Form } from "formik";
import verifyEmailValidationSchema from "./formikData";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./styles.module.css";
import {postAPI} from '@/services/fetchAPI';
import Input from '@/components/formElements/input';
import ErrorText from '@/components/formElements/errorText';
import LoadingScreen from '@/components/loading';

export default function VerifyEmailComponent() {

  const [isloading, setIsloading] = useState(false);
  const [isAccessing, setIsAccessing] = useState(false);

  const router = useRouter();

  return (
  <>
    { isloading && (<LoadingScreen isloading={isloading}/>) }

    <div className={`${styles.main} ${isAccessing ? "pointer-events-none" : "pointer-events-auto"}`}>
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
            email: ""
          }}
          // input check
          validationSchema={verifyEmailValidationSchema}

          onSubmit={async (values) => {
            setIsloading(true);

            await postAPI("/auth/verifyEmail", values).then((data) => {

              if (data.status === "success") {
                setIsAccessing(true);
                toast.success(data.message + " Lütfen Bekleyin, yönlendiriliyorsunuz...");
                setIsloading(false);

                //Bilgi verir ve 5 saniye sonra login sayfasına yönlendirir.
                const timeOut = setInterval(() => {
                  if(data.role){
                    router.push(`/auth/login/${data.role.toLowerCase()}`);
                  }
                  else{
                    router.push(`/`);
                  }
                  
                  
                  clearInterval(timeOut);
                }, 5000);
                
              } else {
                toast.error(data.message);
                setIsloading(false);
              }
            });
          }}
        >
          {(props) => (
            <Form
              onSubmit={props.handleSubmit}
              className={`${isAccessing ? "blur" : ""} ${styles.main_container}`}
            >
              <div className={styles.container}>
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
                      Mail Doğrulama
                    </h1>
                    <div className="mt-4">
                      <Input
                        labelValue="Mail"
                        disabled={isAccessing}
                        id="email"
                        name="email"
                        type="email"
                        value={props.values.email}
                        onChange={props.handleChange}
                        placeholder="Mail adresinizi giriniz."
                      />
                      {props.touched.email && (
                        <ErrorText>{props.errors.email}</ErrorText>
                      )}
                    </div>
                    <div className="w-full flex justify-center mt-6">
                      <button
                        disabled={isAccessing}
                        type="submit"
                        className={`${isAccessing == true ? "bg-secondary" : "bg-primary hover:bg-primarydark"} w-full text-white text-xl 4xl:text-6xl border rounded-md p-4 `}
                      >
                        Doğrulama Maili Gönder
                      </button>
                    </div>
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



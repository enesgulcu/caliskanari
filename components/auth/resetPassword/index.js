"use client";
import { Formik, Form } from "formik";
import resetPasswordValidationSchema from "./formikData";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./resetPassword.module.css";
import ResetPassword from "@/services/auth/resetPassword";
import Input from '@/components/formElements/input';
import ErrorText from '@/components/formElements/errorText';
import LoadingScreen from '@/components/loading';

export default function ResetPasswordComponent(email) {

  const [isloading, setIsloading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  return (
  <>
    { isloading && (<LoadingScreen isloading={isloading}/>) }

    <div className={`${styles.main} ${isLogin ? "pointer-events-none" : "pointer-events-auto"}`}>
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
            password: "",
            passwordConfirm: "",
            email: email,
          }}
          // input check
          validationSchema={resetPasswordValidationSchema}

          onSubmit={async (values) => {

            setIsloading(true);

            await ResetPassword(values).then((data) => {

              if (data.status === "success") {
                setIsLogin(true);
                toast.success(data.message + "Lütfen Bekleyin, yönlendiriliyorsunuz...");
                setIsloading(false);

                //Bilgi verir ve 5 saniye sonra login sayfasına yönlendirir.
                const timeOut = setInterval(() => {
                  router.push(`/auth/login/${data.role.toLowerCase()}`);
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
              className={`${isLogin ? "blur" : ""} ${styles.main_container}`}
            >
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
                        labelValue="Yeni Şifre"
                        disabled={isLogin}
                        id="password"
                        name="password"
                        type="password"
                        value={props.values.password}
                        onChange={props.handleChange}
                        placeholder="şifrenizi giriniz."
                      />
                      {props.touched.password && (
                        <ErrorText>{props.errors.password}</ErrorText>
                      )}
                    </div>
                    <div className="mt-4">
                      <Input
                        labelValue="Yeni Şifre Doğrulama"
                        disabled={isLogin}
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        value={props.values.passwordConfirm}
                        onChange={props.handleChange}
                        placeholder="Şifrenizi tekrar giriniz."
                      />
                      {props.touched.passwordConfirm && (
                        <ErrorText>{props.errors.passwordConfirm}</ErrorText>
                      )}
                    </div>

                    <div className="w-full flex justify-center mt-6">
                      <button
                        disabled={isLogin}
                        type="submit"
                        className={`${isLogin == true ? "bg-secondary" : "bg-primary hover:bg-primarydark"}  w-3/4 mb-6 text-white text-xl 4xl:text-6xl border rounded-md p-4 `}
                      >
                        Şifreyi Sıfırla
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


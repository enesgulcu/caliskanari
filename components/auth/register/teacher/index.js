"use client";
import { Formik, Form } from "formik";
//import studentValidationSchema from "../student/student/formikData";
import { createStudent } from "@/services/auth/register/student/index";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./studentRegister.module.css";

export default function TeacherRegisterComponent() {
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
          password: "",
          activationCode: ""
        }}
        // input kontrol check
        //validationSchema={studentValidationSchema}
        onSubmit={(values) => {
          // kullanıcı 2 şifresini de doğru girerse artık "passwordConfirm" değerine ihtiyacımız olmayacak.
          // burada temizleriz. prisma hata veriyor (veri tabanında olmayan bir değer) gönderidğimiz için.
          delete values.passwordConfirm;
          createStudent(values).then((res) => {
            if (res.status === "success") {
              // Giriş başarılı ise ekrana "blur" efekti verir
              setIsLogin(true);

              toast.success(res.message + " (Yönlendiriliyorsunuz...)");

              const timeOut = setInterval(() => {
                router.push("/auth/login");
                clearInterval(timeOut);
              }, 5000);

              values.password = "";
              values.passwordConfirm = "";
            } else {
              toast.error(
                res.message
                  ? res.message
                  : "Girdiğini bilgileri kontrol ediniz."
              );
              values.password = "";
              values.passwordConfirm = "";
            }
          });
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit} className={styles.main_container}>
            
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

                    </div>
                    <button
                      className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                      href="#"
                    >
                      Giriş Yap
                    </button>

                    <div className="mt-4 text-center">
                      <p className="text-sm">
                        Kayıtlı hesabınız yok mu?{" "}
                        <a href="#" className="text-blue-600 hover:underline">{" "} Kayıt Ol.</a>
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
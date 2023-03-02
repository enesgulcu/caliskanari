"use client"
import { createStudent } from '@/services/auth/register/student/index';
import getAdress from '@/services/auth/register/getAdress';
import { ToastContainer, toast } from 'react-toastify';
import studentValidationSchema from './formikData';
import styles from './studentRegister.module.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import Image from "next/image";
import Link from 'next/link';

export default function StudentRegisterComponent({CitiesData}) {

  // şehirlerin listesini containerdan prop olarak alırız.
  const cities = CitiesData.data;

  const [isLogin, setIsLogin] = useState(false);
  
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [towns, setTowns] = useState("");
  const [schooltype, setSchooltype] = useState("");

  const [schollNames, setschollNames] = useState("");

  useEffect(() => {
    city != "" && getAdress(city).then(res => setTowns(res));
    setTown("");
    setTowns("");
    setschollNames("");
    setSchooltype("");

    
  }, [city])

  useEffect(() => {
    setschollNames("");
    setSchooltype("");
  }, [town])

  useEffect(() => {
    if(city != "" && town != ""){
      if(schooltype == "Özel Okul / Kolej"){
        setschollNames("");
      }
      else{
        town != "" && getAdress(`${city}/${town}/${schooltype}`).then(res => setschollNames(res));
      }
    }
    
  }, [schooltype])

  const router = useRouter();

  return (
    <div className="select-none">

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
          role: "student",
          name: "",
          surname: "",
          phone: "",  
          city: "",
          town: "",
          schooltype: "",
          schollName: "",
          class: "",       
          email: "",
          password: "",
          passwordConfirm: "",

        }}

        // input kontrol check
        validationSchema={studentValidationSchema}
        onSubmit={(values) => {
          // kullanıcı 2 şifresini de doğru girerse artık "passwordConfirm" değerine ihtiyacımız olmayacak.
          // burada temizleriz. prisma hata veriyor (veri tabanında olmayan bir değer) gönderidğimiz için.
          delete values.passwordConfirm;
          createStudent(values).then(res =>{

            if(res.status === "success"){
              // Giriş başarılı ise ekrana "blur" efekti verir
              setIsLogin(true);

              toast.success(res.message + " (Yönlendiriliyorsunuz...)")

              //Bilgi verir ve 5 saniye sonra login sayfasına yönlendirir.
              const timeOut = setInterval(() => {
                router.push('/auth/login');
                clearInterval(timeOut);
              }, 5000);

              values.password = "";
              values.passwordConfirm = "";
              

            }else{
              // girilen mail adresi daha önce kullanılmış ise hata mesajı verir. ve şifreleri temizler.
              toast.error(res.message ? res.message : "Girdiğini bilgileri kontrol ediniz.")
              values.password = "";
              values.passwordConfirm = "";
            }
          });
           
        }}
      >
      
        {(props) => (
          // Formik içindeki inputları burada kullanırız. // css'de giriş başarılı ise blur efekti verir.
          <Form onSubmit={props.handleSubmit} className={`flex ${isLogin ? "blur"  : ""} ${styles.form}`}>
            <div className={styles.cotaniner}>
              <div className={styles.cotaniner_icon}>
              <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="logo"
                priority={true}
                className='w-auto'
            />
              </div>
            
            <h1 className={styles.container_label}>ÖĞRENCİ KAYIT</h1>
              <div className="flex flex-wrap -mx-3 mb-2 max-w-[800px]">
                <div className={styles.container_first_row}>
                  <label className={styles.inputLabel} htmlFor="name">
                    İsim
                  </label>
                  <input                   
                  id='name'
                  name='name'
                  type='text'
                  value={props.values.name}
                  onChange={props.handleChange}
                  placeholder='İsminizi giriniz.'
                  className={styles.inputClass} 
                  />
                  <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.name && props.errors.name}</p>
                </div>
                <div className={styles.container_first_row}>
                  <label className={styles.inputLabel} htmlFor="surname">
                    Soyisim
                  </label>
                  <input 
                  id='surname'
                  name='surname'
                  type='text'
                  value={props.values.surname}
                  onChange={props.handleChange}
                  placeholder='Soyisminizi giriniz.'
                  className={styles.inputClass} 
                  />
                  <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.surname && props.errors.surname}</p>
                </div>
                <div className={styles.container_middle_row}>
                  <label className={styles.inputLabel}  htmlFor="phone">
                    Telefon
                  </label>
                  <input 
                  id='phone'
                  name='phone'
                  type='text'
                  value={props.values.phone}
                  onChange={props.handleChange}
                  placeholder='5xxxxxxxxx'
                  className={styles.inputClass} 
                  />
                  <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.phone && props.errors.phone}</p>
                </div>
                <div className={styles.container_middle_row}>
                  <label className={styles.inputLabel} htmlFor="class">
                    Sınıf
                  </label>
                  <select
                  id="class"
                  name="class"
                  value={props.values.class}
                  onChange={props.handleChange}
                  className={styles.inputClass} 
                  >
                    <option label="Sınıfını Seç"></option>
                    <option value="1. Sınıf">1. Sınıf</option>
                    <option value="2. Sınıf">2. Sınıf</option>
                    <option value="3. Sınıf">3. Sınıf</option>
                    <option value="4. Sınıf">4. Sınıf</option>
                    <option value="5. Sınıf">5. Sınıf</option>
                    <option value="6. Sınıf">6. Sınıf</option>
                    <option value="7. Sınıf">7. Sınıf</option>
                    <option value="8. Sınıf">8. Sınıf</option>
                    <option value="9. Sınıf">9. Sınıf</option>
                    <option value="10. Sınıf">10. Sınıf</option>
                    <option value="11. Sınıf">11. Sınıf</option>
                    <option value="12. Sınıf">12. Sınıf</option>
                    
                  </select>
                  <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.class && props.errors.class}</p>
                </div>
                <div className={styles.container_middle_row}>
                  <label className={styles.inputLabel} htmlFor="city">
                    Okulun Bulunduğu İl
                  </label>
                  <select
                  id="city"
                  name="city"
                  value={props.values.city}
                  onChange={(e) => {props.handleChange(e); setCity(e.target.value); props.values.town = ""}}
                  className={styles.inputClass} 
                  >
                    <option label="İl Seç"></option>
                    {
                      cities.length > 0 && cities.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                      })
                    }
                  </select>
                  <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.city && props.errors.city}</p>
                </div>
                <div className={styles.container_middle_row}>
                  <label className={styles.inputLabel} htmlFor="city">
                  Okulun Bulunduğu İlçe
                  </label>
                  <select
                  id="town"
                  name="town"
                  disabled={city ? false : true}
                  value={props.values.town}
                  onChange={(e) => {props.handleChange(e); setTown(e.target.value); props.values.schollName = ""; props.values.schooltype = ""}}
                  className={styles.inputClass} 
                  >
                    <option label="İlçe Seç"></option>
                    {
                      towns.length > 0 && towns.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                      })
                    }
                  </select>
                  <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.town && props.errors.town}</p>
                </div>
                <div className={styles.container_middle_row} >
                  <label className={styles.inputLabel} htmlFor="schooltype">
                    Okul Türü
                  </label>
                  <select
                  id="schooltype"
                  name="schooltype"
                  disabled={town ? false : true}
                  value={props.values.schooltype}
                  onChange={(e) => {props.handleChange(e); setSchooltype(e.target.value); props.values.schollName = ""}}
                  className={styles.inputClass} 
                  >
                    <option label="Okul Türü Seç">Okul Türü Seç</option>
                    {town && 
                    <>
                      <option value="anaokul">Anaokulu</option>
                      <option value="ilkokul">İlkokul</option>
                      <option value="ortaokul">Ortaokul</option>
                      <option value="lise">Lise</option>
                      <option value="diger">Okulum Listede Yok</option>
                    </>
                    }

                  </select>
                  <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.schooltype && props.errors.schooltype}</p>
                </div>

                {
                props.values.schooltype === "diger" ?
                <div className={styles.container_middle_row }>
                <label className={styles.inputLabel} htmlFor="schollName">
                  Okul İsmi
                </label>
                <input                   
                id='schollName'
                name='schollName'
                type='text'
                disabled={schooltype ? false : true}
                value={props.values.schollName}
                onChange={props.handleChange}
                placeholder='Okul İsmini Gir'
                className={styles.inputClass} 
                />
                <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.schollName && props.errors.schollName}</p>
                </div> 
                :
                <div className={styles.container_middle_row} >
                  <label className={styles.inputLabel} htmlFor="schollName">
                    Okul İsmi
                  </label>
                  <select
                  id="schollName"
                  name="schollName"
                  disabled={schooltype ? false : true}
                  value={props.values.schollName}
                  onChange={(e) => {props.handleChange(e)}}
                  className={styles.inputClass} 
                  >
                    <option label="Okul Seç"></option>
                    {
                      schollNames.length > 0 && props.values.schooltype && schollNames.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                      })
                    }
                  </select>
                  <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.schollName && props.errors.schollName}</p>
                </div>   
                }
                
                <div className={styles.container_end_row}>
                  <label className={styles.inputLabel} htmlFor="email">
                    E-mail
                  </label>
                  <input 
                  id='email'
                  name='email'
                  autoComplete='off'
                  type='email'
                  value={props.values.email}
                  onChange={props.handleChange}
                  placeholder="Mail adresinizi giriniz."
                  className={styles.inputClass} 
                  />
                  <p className=" text-red-500 text-xs italic px-2 pb-2">{props.touched.email && props.errors.email}</p>
                </div>
                <div className={styles.container_end_row}>
                  <label className={styles.inputLabel} htmlFor="password">
                    Şifre
                  </label>
                  <input 
                  id='password'
                  name='password'
                  type='password'
                  value={props.values.password}
                  onChange={props.handleChange}
                  placeholder="******"
                  className={styles.inputClass} 
                  />
                  <p className="text-red-500 text-xs italic">{props.touched.password && props.errors.password}</p>
                </div>
                <div className={styles.container_end_row}>
                    <label className={styles.inputLabel} htmlFor="passwordConfirm">
                      Şifre Doğrulama
                    </label>
                    <input 
                    id='passwordConfirm'
                    name='passwordConfirm'
                    type='password'
                    value={props.values.passwordConfirm}
                    onChange={props.handleChange}
                    placeholder="******"
                    className={styles.inputClass} 
                    />
                    <p className="text-red-500 text-xs italic">{props.touched.passwordConfirm && props.errors.passwordConfirm}</p>
                </div>
                <div className='w-full mt-4 flex justify-center'>
                  <button type='submit' className={styles.submit_button}>Kayıt Ol</button>
                </div>
                <div className="mt-4 text-center px-3 w-full flex justify-center">
                        <p className="text-md">
                          Kayıtlı kullanıcı iseniz lütfen <Link href="/auth/login" className="text-blue-600 hover:underline"> Giriş Yapınız.</Link>
                        </p>
                </div>
                
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
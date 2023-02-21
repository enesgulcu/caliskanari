"use client"
import { Formik, Form } from 'formik';
import styles from './studentRegister.module.css';
import studentValidationSchema from './formikData';
import { createStudent } from '@/services/auth/register/student/index';
import getAdress from '@/services/auth/register/getAdress';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
export default function StudentRegisterComponent(CitiesData) {

  // şehirlerin listesini containerdan prop olarak alırız.
  const cities = CitiesData.CitiesData.data;

  const [isLogin, setIsLogin] = useState(false);
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [towns, setTowns] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [neighborhoods, setNeighborhoods] = useState("");

  useEffect(() => {
    city != "" && getAdress(city).then(res => setTowns(res));
    setTown("");
    setTowns("");
    setNeighborhood("");
    setNeighborhoods("");
    
  }, [city])

  useEffect(() => {
    town != "" && getAdress(`${city}/${town}`).then(res => setNeighborhoods(res));
    setNeighborhood("");
    setNeighborhoods("");
  }, [town])

  const router = useRouter();

  return (
    <div>

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
          status: "student",
          name: "",
          surname: "",
          age: "",
          phone: "",  
          city: "",
          town: "",
          neighborhood: "",
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

              const timeOut = setInterval(() => {
                router.push('/auth/login');
                clearInterval(timeOut);
              }, 5000);

              values.password = "";
              values.passwordConfirm = "";
              

            }else{
              toast.error(res.message ? res.message : "Girdiğini bilgileri kontrol ediniz.")
              values.password = "";
              values.passwordConfirm = "";
            }
          });
              
           
        }}
      >
      
        {(props) => (
          <Form onSubmit={props.handleSubmit} className={`flex ${isLogin ? "blur"  : ""} ${styles.form}`}>
            <div className={styles.cotaniner}>
              <div className={styles.cotaniner_icon}>
              <Image
                src="/logo.png"
                width="100"
                height="100"
                alt="logo"
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
                  <p className=" text-red-500 text-xs italic">{props.touched.name && props.errors.name}</p>
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
                  <p className=" text-red-500 text-xs italic">{props.touched.surname && props.errors.surname}</p>
                </div>
                <div className={styles.container_middle_row}>
                  <label className={styles.inputLabel} htmlFor="age">
                    Yaş
                  </label>
                  <input 
                  id='age'
                  name='age'
                  type='Number'
                  value={props.values.age}
                  onChange={props.handleChange}
                  placeholder='16'
                  className={styles.inputClass} 
                  />
                  <p className=" text-red-500 text-xs italic">{props.touched.age && props.errors.age}</p>
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
                  placeholder='555 555 55 55'
                  className={styles.inputClass} 
                  />
                  <p className=" text-red-500 text-xs italic">{props.touched.phone && props.errors.phone}</p>
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
                  <p className=" text-red-500 text-xs italic">{props.touched.class && props.errors.class}</p>
                </div>
                <div className={styles.container_middle_row}>
                  <label className={styles.inputLabel} htmlFor="city">
                    İl
                  </label>
                  <select
                  id="city"
                  name="city"
                  value={props.values.city}
                  onChange={(e) => {props.handleChange(e); setCity(e.target.value)}}
                  className={styles.inputClass} 
                  >
                    <option label="İl Seç"></option>
                    {
                      cities.length > 0 && cities.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                      })
                    }
                  </select>
                  <p className=" text-red-500 text-xs italic">{props.touched.city && props.errors.city}</p>
                </div>

                <div className={styles.container_middle_row}>
                  <label className={styles.inputLabel} htmlFor="city">
                    İlçe
                  </label>
                  <select
                  id="town"
                  name="town"
                  value={props.values.town}
                  onChange={(e) => {props.handleChange(e); setTown(e.target.value)}}
                  className={styles.inputClass} 
                  >
                    <option label="İlçe Seç"></option>
                    {
                      towns.length > 0 && towns.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                      })
                    }
                  </select>
                  <p className=" text-red-500 text-xs italic">{props.touched.town && props.errors.town}</p>
                </div>
                <div className={styles.container_middle_row} >
                  <label className={styles.inputLabel} htmlFor="neighborhood">
                    Mahalle
                  </label>
                  <select
                  id="neighborhood"
                  name="neighborhood"
                  value={props.values.neighborhood}
                  onChange={(e) => {props.handleChange(e); setNeighborhood(e.target.value)}}
                  className={styles.inputClass} 
                  >
                    <option label="Mahalle Seç"></option>
                    {
                      neighborhoods.length > 0 && neighborhoods.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                      })
                    }
                  </select>
                  <p className=" text-red-500 text-xs italic">{props.touched.neighborhood && props.errors.neighborhood}</p>
                </div> 
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
                  <p className=" text-red-500 text-xs italic">{props.touched.email && props.errors.email}</p>
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
                <div className="mt-4 text-center px-3 w-full flex justify-center">
                        <p className="text-md">
                          Kayıtlı kullanıcı iseniz Lütfen{" "}
                          <a href="#" className="text-blue-600 hover:underline">{" "} Giriş Yapınız.</a>
                        </p>
                </div>
                <div className='w-full mt-4 flex justify-center'>
                  <button type='submit' className={styles.submit_button}>Kayıt Ol</button>
                </div>
              </div>
              
             
              
            </div>

            
          </Form>
        )}


      </Formik>
    </div>
  )
}
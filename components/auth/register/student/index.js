"use client"
import { Formik, Form } from 'formik';
import studentValidationSchema from './formikData';
import { createStudent } from '@/services/auth/register/student/index';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function StudentRegisterComponent() {

  const [isLogin, setIsLogin] = useState(false)
  
  const router = useRouter();

  return (
    <div className='bg-red-400'>

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
          neighbourhood: "",
          class: "",
          school: "",          
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
              setIsLogin(true);
              toast.success(res.message + " (Yönlendiriliyorsunuz...)")
              const timeOut = setInterval(() => {
                router.push('/auth/login');
                clearInterval(timeOut);
              }, 5000);
              

            }else{
              toast.error(res.message ? res.message : "Girdiğini bilgileri kontrol ediniz.")
            }
          });
              
           
          
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit} className={`flex ${isLogin ? "blur" : ""} justify-center flex-col items-center bg-gray-600 w-screen min-h-screen`}>
            
            <div className='m-8 bg-white p-10 rounded'>
            <h3 className='font-bold text-gray-700  mb-16 w-full  text-center md:text-5xl text-3xl '>ÖĞRENCİ KAYIT</h3>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    İsim
                  </label>
                  <input                   
                  id='name'
                  name='name'
                  type='text'
                  value={props.values.name}
                  onChange={props.handleChange}
                  placeholder='İsminizi giriniz.'
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                  />
                  <p className=" text-red-500 text-xs italic">{props.touched.name && props.errors.name}</p>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Soyisim
                  </label>
                  <input 
                  id='surname'
                  name='surname'
                  type='text'
                  value={props.values.surname}
                  onChange={props.handleChange}
                  placeholder='Soyisminizi giriniz.'
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  <p className=" text-red-500 text-xs italic">{props.touched.surname && props.errors.surname}</p>
                </div>
                <div className="w-full md:w-1/3 px-3 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Yaş
                  </label>
                  <input 
                  id='age'
                  name='age'
                  type='Number'
                  value={props.values.age}
                  onChange={props.handleChange}
                  placeholder='16'
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  <p className=" text-red-500 text-xs italic">{props.touched.age && props.errors.age}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  htmlFor="grid-last-name">
                    Telefon
                  </label>
                  <input 
                  id='phone'
                  name='phone'
                  type='text'
                  value={props.values.phone}
                  onChange={props.handleChange}
                  placeholder='555 555 55 55'
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  <p className=" text-red-500 text-xs italic">{props.touched.phone && props.errors.phone}</p>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Şehir
                  </label>
                  <select
                  id="city"
                  name="city"
                  value={props.values.city}
                  onChange={props.handleChange}
                  className=" cursor-pointer appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option label="Şehrini Seç"></option>
                    <option value="b">İstanbul</option>
                    <option value="c">Ankara</option>
                    <option value="d">İzmir</option>
                  </select>
                  <p className=" text-red-500 text-xs italic">{props.touched.city && props.errors.city}</p>
                </div>
                <div className="w-full md:w-1/3 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    İlçe
                  </label>
                  <select
                  id="neighbourhood"
                  name="neighbourhood"
                  value={props.values.neighbourhood}
                  onChange={props.handleChange}
                  className=" cursor-pointer appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option label="İlçeni Seç"></option>
                    <option value="b">Küçükçekmece</option>
                    <option value="c">Avcılar</option>
                    <option value="d">Beylikdüzü</option>
                  </select>
                  <p className=" text-red-500 text-xs italic">{props.touched.neighbourhood && props.errors.neighbourhood}</p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Sınıf
                  </label>
                  <select
                  id="class"
                  name="class"
                  value={props.values.class}
                  onChange={props.handleChange}
                  className=" cursor-pointer appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option label="Sınıfını Seç"></option>
                    <option value="1">1. Sınıf</option>
                    <option value="2">2. Sınıf</option>
                    <option value="3">3. Sınıf</option>
                  </select>
                  <p className=" text-red-500 text-xs italic">{props.touched.class && props.errors.class}</p>
                </div>
                <div className="w-full md:w-2/3 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Okul
                  </label>
                  <select
                  id="school"
                  name="school"
                  value={props.values.school}
                  onChange={props.handleChange}
                  className=" cursor-pointer appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option label="Okulunu Seç"></option>
                    <option value="b">Atatürk Okulu</option>
                    <option value="c">Maraşel Okulu</option>
                    <option value="d">Merkez okul</option>
                  </select>
                  <p className=" text-red-500 text-xs italic">{props.touched.school && props.errors.school}</p>
                </div>                
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
              
              <div className="w-full px-3">
                  <label className="block uppercase tracking-wide mb-2 mt-2 text-gray-700 text-xs font-bold" htmlFor="grid-password">
                    E-mail
                  </label>
                  <input 
                  id='email'
                  name='email'
                  type='email'
                  value={props.values.email}
                  onChange={props.handleChange}
                  placeholder="Mail adresinizi giriniz."
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  />
                  <p className=" text-red-500 text-xs italic">{props.touched.email && props.errors.email}</p>
              </div>
               
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide mb-2 text-gray-700 text-xs font-bold" htmlFor="grid-password">
                    Şifre
                  </label>
                  <input 
                  id='password'
                  name='password'
                  type='password'
                  value={props.values.password}
                  onChange={props.handleChange}
                  placeholder="******************"
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  />
                  <p className="text-red-500 text-xs italic">{props.touched.password && props.errors.password}</p>
              </div>
              <div className="w-full px-3">
                  <label className="block uppercase tracking-wide mb-2 mt-2 text-gray-700 text-xs font-bold" htmlFor="grid-password">
                    Şifre Doğrulama
                  </label>
                  <input 
                  id='passwordConfirm'
                  name='passwordConfirm'
                  type='password'
                  value={props.values.passwordConfirm}
                  onChange={props.handleChange}
                  placeholder="******************"
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  />
                  <p className="text-red-500 text-xs italic">{props.touched.passwordConfirm && props.errors.passwordConfirm}</p>
              </div>
              <div className='w-full mt-10 flex justify-center'>
                <button type='submit' className='p-4 bg-blue-500 rounded w-44 text-white '>Kayıt Ol</button>
              </div>
              </div>
            </div>

            
          </Form>
        )}


      </Formik>
    </div>
  )
}

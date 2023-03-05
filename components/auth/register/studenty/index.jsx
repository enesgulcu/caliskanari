'use client';
import { createStudent } from '@/services/auth/register/student/index';
import getAdress from '@/services/auth/register/getAdress';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import studentValidationSchema from './formikData';
import { Formik, Form } from 'formik';
import styles from './studentRegister.module.css';
import { FaCheck } from 'react-icons/fa';

import { Transition } from '@headlessui/react';

export default function StudentRegisterComponent({ CitiesData }) {
  // şehirlerin listesini containerdan prop olarak alırız.
  const cities = CitiesData.data;

  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [towns, setTowns] = useState('');
  const [schooltype, setSchooltype] = useState('');

  const [schollNames, setschollNames] = useState('');

  const [isLogin, setIsLogin] = useState(false);
  const [activeTab, setActiveTab] = useState({ index: 1 });

  useEffect(() => {
    city != '' && getAdress(city).then((res) => setTowns(res));
    setTown('');
    setTowns('');
    setschollNames('');
    setSchooltype('');
  }, [city]);

  useEffect(() => {
    setschollNames('');
    setSchooltype('');
  }, [town]);

  useEffect(() => {
    if (city != '' && town != '') {
      if (schooltype == 'Özel Okul / Kolej') {
        setschollNames('');
      } else {
        town != '' &&
          getAdress(`${city}/${town}/${schooltype}`).then((res) =>
            setschollNames(res)
          );
      }
    }
  }, [schooltype]);

  const router = useRouter();

  function nextActiveTab(e, values) {
    e.preventDefault();
    if (activeTab.index === 1) {
      if (values.name === '' || values.surname === '' || values.phone === '') {
        toast.error('Lütfen boş alanları doldurunuz.');
        return;
      }
    } else if (activeTab.index === 2) {
      if (
        values.city === '' ||
        values.town === '' ||
        values.schooltype === ''
      ) {
        toast.error('Lütfen boş alanları doldurunuz.');
        return;
      }
    }
    if (activeTab.index === 3) return;
    setActiveTab({ index: 1 + activeTab.index });
  }

  function prevActiveTab(e) {
    e.preventDefault();
    if (activeTab.index === 1) return;
    setActiveTab({ index: activeTab.index - 1 });
  }

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <div className='select-none bg-gray-100 md:grid grid-cols-2 h-screen'>
        {/* left side */}
        <div className='hidden md:block'>
          <img
            className='w-full h-full'
            src='https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8MmslMjB3YWxscGFwZXJ8ZW58MHx8MHx8&w=1000&q=80'
          />
        </div>
        {/* right side */}
        <Formik
          // input verileri
          initialValues={{
            role: 'student',
            name: '',
            surname: '',
            phone: '',
            city: '',
            town: '',
            schooltype: '',
            schollName: '',
            class: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          // input kontrol check
          validationSchema={studentValidationSchema}
          onSubmit={(values) => {
            // kullanıcı 2 şifresini de doğru girerse artık "passwordConfirm" değerine ihtiyacımız olmayacak.
            // burada temizleriz. prisma hata veriyor (veri tabanında olmayan bir değer) gönderidğimiz için.
            delete values.passwordConfirm;
            createStudent(values).then((res) => {
              if (res.status === 'success') {
                // Giriş başarılı ise ekrana "blur" efekti verir
                setIsLogin(true);

                toast.success(res.message + ' (Yönlendiriliyorsunuz...)');

                //Bilgi verir ve 5 saniye sonra login sayfasına yönlendirir.
                const timeOut = setInterval(() => {
                  router.push('/auth/login/student');
                  clearInterval(timeOut);
                }, 4000);

                values.password = '';
                values.passwordConfirm = '';
              } else {
                // girilen mail adresi daha önce kullanılmış ise hata mesajı verir. ve şifreleri temizler.
                toast.error(
                  res.message
                    ? res.message
                    : 'Girdiğini bilgileri kontrol ediniz.'
                );
                values.password = '';
                values.passwordConfirm = '';
              }
            });
          }}
        >
          {(props) => (
            // Formik içindeki inputları burada kullanırız. // css'de giriş başarılı ise blur efekti verir.
            <Form
              onSubmit={props.handleSubmit}
              className={`flex ${isLogin ? 'blur' : ''}`}
            >
              <div className='flex justify-center items-center flex-col w-full'>
                <div className='mx-auto mb-10'>
                  <div className='flex justify-center items-center flex-col mb-2'>
                    <h1 className='mb-4 text-2xl uppercase font-bold text-center text-gray-700 mt-4'>
                      Öğrenci Kayıt
                    </h1>
                  </div>
                  <div className='grid gap-8 row-gap-0 grid-cols-3'>
                    {/* Progress Bar Step 1 */}
                    <div className='relative text-center z-10'>
                      <div className='bg-gray-500 shadow shadow-gray-500 text-white border-2 flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full'>
                        {activeTab.index === 1 ? (
                          <p className='text-3xl font-bold'>1</p>
                        ) : (
                          <FaCheck className='w-1/2 h-1/3 text-white' />
                        )}
                      </div>
                      <h6 className='mb-2 text-xl'>Kullanıcı Bilgileri</h6>
                      <div className='top-0 right-0 flex items-center justify-center h-16 -mr-24 my-20 absolute -z-10'>
                        <div className='w-40 h-40 absolute right-0 border-black border-l-2 rotate-90 flex justify-center items-center'></div>
                      </div>
                    </div>
                    {/* Progress Bar Step 2 */}
                    <div className='relative text-center z-10'>
                      <div className='bg-gray-500 shadow shadow-gray-500 text-white border-2 flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full'>
                        {activeTab.index < 3 ? (
                          <p className='text-3xl font-bold'>2</p>
                        ) : (
                          <FaCheck className='w-1/2 h-1/3 text-white' />
                        )}
                      </div>
                      <h6 className='mb-2 text-xl'>Okul Bilgileri</h6>
                      <div className='top-0 right-0 flex items-center justify-center h-16 -mr-24 my-20 absolute -z-10'>
                        <div className='w-40 h-40 absolute right-0 border-black border-l-2 rotate-90 flex justify-center items-center'></div>
                      </div>
                    </div>
                    {/* Progress Bar Step 3 */}
                    <div className='relative text-center z-10'>
                      <div className='bg-gray-500 shadow shadow-gray-500 text-white border-2 flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full'>
                        <p className='text-3xl font-bold'>3</p>
                      </div>
                      <h6 className='mb-2 text-xl'>Giriş Bilgileri</h6>
                    </div>
                  </div>
                </div>

                <div className='block w-full opacity-100'>
                  {/* Step 1 */}
                  <Transition
                    className='mx-8 my-4 max-w-full'
                    show={activeTab.index === 1}
                    enter='transition-all ease-in-out duration-500 delay-[200ms]'
                    enterFrom='opacity-0 translate-y-6'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition-all ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className={styles.container_first_row}>
                      <label className={styles.inputLabel} htmlFor='name'>
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
                      <p className=' text-red-500 text-xs italic px-2 pb-2'>
                        {props.touched.name && props.errors.name}
                      </p>
                    </div>
                    <div className={styles.container_first_row}>
                      <label className={styles.inputLabel} htmlFor='surname'>
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
                      <p className=' text-red-500 text-xs italic px-2 pb-2'>
                        {props.touched.surname && props.errors.surname}
                      </p>
                    </div>
                    <div className={styles.container_middle_row}>
                      <label className={styles.inputLabel} htmlFor='phone'>
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
                      <p className=' text-red-500 text-xs italic px-2 pb-2'>
                        {props.touched.phone && props.errors.phone}
                      </p>
                    </div>
                  </Transition>
                </div>
                <div className='w-full'>
                  {/* Step 2 */}
                  <Transition
                    className='mx-10 my-4 max-w-full'
                    show={activeTab.index === 2}
                    enter='transition-all ease-in-out duration-500 delay-[200ms]'
                    enterFrom='opacity-0 translate-y-6'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition-all ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='grid grid-cols-2 gap-2'>
                      <div>
                        <label className={styles.inputLabel} htmlFor='city'>
                          Okulun Bulunduğu İl
                        </label>
                        <select
                          id='city'
                          name='city'
                          value={props.values.city}
                          onChange={(e) => {
                            props.handleChange(e);
                            setCity(e.target.value);
                            props.values.town = '';
                          }}
                          className={styles.inputClass}
                        >
                          <option label='İl Seç'></option>
                          {cities.length > 0 &&
                            cities.map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                        </select>
                        <p className=' text-red-500 text-xs italic px-2 pb-2'>
                          {props.touched.city && props.errors.city}
                        </p>
                      </div>
                      <div>
                        <label className={styles.inputLabel} htmlFor='city'>
                          Okulun Bulunduğu İlçe
                        </label>
                        <select
                          id='town'
                          name='town'
                          disabled={city ? false : true}
                          value={props.values.town}
                          onChange={(e) => {
                            props.handleChange(e);
                            setTown(e.target.value);
                            props.values.schollName = '';
                            props.values.schooltype = '';
                          }}
                          className={styles.inputClass}
                        >
                          <option label='İlçe Seç'></option>
                          {towns.length > 0 &&
                            towns.map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                        </select>
                        <p className=' text-red-500 text-xs italic px-2 pb-2'>
                          {props.touched.town && props.errors.town}
                        </p>
                      </div>
                      <div>
                        <label
                          className={styles.inputLabel}
                          htmlFor='schooltype'
                        >
                          Okul Türü
                        </label>
                        <select
                          id='schooltype'
                          name='schooltype'
                          disabled={town ? false : true}
                          value={props.values.schooltype}
                          onChange={(e) => {
                            props.handleChange(e);
                            setSchooltype(e.target.value);
                            props.values.schollName = '';
                          }}
                          className={styles.inputClass}
                        >
                          <option label='Okul Türü Seç'>Okul Türü Seç</option>
                          {town && (
                            <>
                              <option value='anaokul'>Anaokulu</option>
                              <option value='ilkokul'>İlkokul</option>
                              <option value='ortaokul'>Ortaokul</option>
                              <option value='lise'>Lise</option>
                              <option value='diger'>Okulum Listede Yok</option>
                            </>
                          )}
                        </select>
                        <p className=' text-red-500 text-xs italic px-2 pb-2'>
                          {props.touched.schooltype && props.errors.schooltype}
                        </p>
                      </div>
                      {props.values.schooltype === 'diger' ? (
                        <div>
                          <label
                            className={styles.inputLabel}
                            htmlFor='schollName'
                          >
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
                          <p className=' text-red-500 text-xs italic px-2 pb-2'>
                            {props.touched.schollName &&
                              props.errors.schollName}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <label
                            className={styles.inputLabel}
                            htmlFor='schollName'
                          >
                            Okul İsmi
                          </label>
                          <select
                            id='schollName'
                            name='schollName'
                            disabled={schooltype ? false : true}
                            value={props.values.schollName}
                            onChange={(e) => {
                              props.handleChange(e);
                            }}
                            className={styles.inputClass}
                          >
                            <option label='Okul Seç'></option>
                            {schollNames.length > 0 &&
                              props.values.schooltype &&
                              schollNames.map((item, index) => {
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                          </select>
                          <p className=' text-red-500 text-xs italic px-2 pb-2'>
                            {props.touched.schollName &&
                              props.errors.schollName}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className={styles.inputLabel} htmlFor='class'>
                        Sınıf
                      </label>
                      <select
                        id='class'
                        name='class'
                        value={props.values.class}
                        onChange={props.handleChange}
                        className={styles.inputClass}
                      >
                        <option label='Sınıfını Seç'></option>
                        <option value='1. Sınıf'>1. Sınıf</option>
                        <option value='2. Sınıf'>2. Sınıf</option>
                        <option value='3. Sınıf'>3. Sınıf</option>
                        <option value='4. Sınıf'>4. Sınıf</option>
                        <option value='5. Sınıf'>5. Sınıf</option>
                        <option value='6. Sınıf'>6. Sınıf</option>
                        <option value='7. Sınıf'>7. Sınıf</option>
                        <option value='8. Sınıf'>8. Sınıf</option>
                        <option value='9. Sınıf'>9. Sınıf</option>
                        <option value='10. Sınıf'>10. Sınıf</option>
                        <option value='11. Sınıf'>11. Sınıf</option>
                        <option value='12. Sınıf'>12. Sınıf</option>
                      </select>
                      <p className=' text-red-500 text-xs italic px-2 pb-2'>
                        {props.touched.class && props.errors.class}
                      </p>
                    </div>
                  </Transition>
                </div>
                <div className='w-full'>
                  {/* Step 3 */}
                  <Transition
                    className='mx-8 my-4 max-w-full'
                    show={activeTab.index === 3}
                    enter='transition-all ease-in-out duration-500 delay-[200ms]'
                    enterFrom='opacity-0 translate-y-6'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition-all ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className={styles.container_end_row}>
                      <label className={styles.inputLabel} htmlFor='email'>
                        E-mail
                      </label>
                      <input
                        id='email'
                        name='email'
                        autoComplete='off'
                        type='email'
                        value={props.values.email}
                        onChange={props.handleChange}
                        placeholder='Mail adresinizi giriniz.'
                        className={styles.inputClass}
                      />
                      <p className=' text-red-500 text-xs italic px-2 pb-2'>
                        {props.touched.email && props.errors.email}
                      </p>
                    </div>
                    <div className={styles.container_end_row}>
                      <label className={styles.inputLabel} htmlFor='password'>
                        Şifre
                      </label>
                      <input
                        id='password'
                        name='password'
                        type='password'
                        value={props.values.password}
                        onChange={props.handleChange}
                        placeholder='******'
                        className={styles.inputClass}
                      />
                      <p className='text-red-500 text-xs italic px-2 pb-2'>
                        {props.touched.password && props.errors.password}
                      </p>
                    </div>
                    <div className={styles.container_end_row}>
                      <label
                        className={styles.inputLabel}
                        htmlFor='passwordConfirm'
                      >
                        Şifre Doğrulama
                      </label>
                      <input
                        id='passwordConfirm'
                        name='passwordConfirm'
                        type='password'
                        value={props.values.passwordConfirm}
                        onChange={props.handleChange}
                        placeholder='******'
                        className={styles.inputClass}
                      />
                      <p className='text-red-500 text-xs italic'>
                        {props.touched.passwordConfirm &&
                          props.errors.passwordConfirm}
                      </p>
                    </div>
                  </Transition>
                </div>
                {/* Next, Prev, Submit Buttons */}
                <div className='w-full px-10'>
                  {/* Prev Button */}
                  {activeTab.index >= 2 && (
                    <button
                      onClick={(e) => prevActiveTab(e)}
                      className='mb-10 w-1/4 text-white bg-[#777779] border rounded-md p-4 hover:bg-[#8a8a8a]'
                    >
                      Geri
                    </button>
                  )}
                  {/* Next Button */}
                  {activeTab.index < 3 && (
                    <button
                      onClick={(e) => nextActiveTab(e, props.values)}
                      className={`${
                        activeTab.index === 1 ? 'w-full' : 'w-3/4'
                      } mb-10 text-white bg-[#5b3acc] border rounded-md p-4 hover:bg-[#5233bb]`}
                    >
                      İleri
                    </button>
                  )}
                  {/* Submit Button */}
                  {activeTab.index === 3 && (
                    <button type='submit' className={styles.submit_button}>
                      Kayıt Ol
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

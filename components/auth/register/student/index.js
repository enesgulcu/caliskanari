'use client';
import { createStudent } from '@/services/auth/register/student/index';
import getAdress from '@/services/auth/register/getAdress';
import { ToastContainer, toast } from 'react-toastify';
import studentValidationSchema from './formikData';
import styles from './studentRegister.module.css';
import LoadingScreen from '@/components/loading';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import Input from '@/components/formElements/input';
import ErrorText from '@/components/formElements/errorText';
import Select from '@/components/formElements/select';






export default function StudentRegisterComponent({ CitiesData }) {
  // şehirlerin listesini containerdan prop olarak alırız.
  const cities = CitiesData.data;

  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [towns, setTowns] = useState('');
  const [schooltype, setSchooltype] = useState('');

  // yükleme ekranları tetikleneceği zaman çalışan state.
  const [isloading, setIsloading] = useState(false);

  const [schollNames, setschollNames] = useState('');

  const [isRegister, setIsRegister] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setIsloading(true);
    if (city !== '') {
      getAdress(city)
        .then((res) => {
          setTowns(res);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    setIsloading(false);

  }, [towns, schollNames])
  

  useEffect(() => {
    
    if (city != '' && town != '') {
      setIsloading(true);
      if (schooltype == 'Özel Okul / Kolej') {
        setschollNames('');
      } else {
        if (town !== '') {
          getAdress(`${city}/${town}/${schooltype}`)
            .then((res) => {
              setschollNames(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  }, [schooltype]);

  const router = useRouter();

  function nextActiveTab(e, props) {
    e.preventDefault();
    const { errors } = props;
    props.handleSubmit();
    if (activeTab === 1) {
      if (errors.name || errors.surname || errors.phone) {
        return props.errors;
      } else {
        props.setErrors({});
        props.setTouched({});
      }
    }
    if (activeTab === 2) {
      if (
        errors.city ||
        errors.town ||
        errors.schooltype ||
        errors.schollName ||
        errors.class
      ) {
        return props.errors;
      } else {
        props.setErrors({});
        props.setTouched({});
      }
    }
    if (activeTab === 3) return;
    setActiveTab((activeTab) => activeTab + 1);
  }

  function prevActiveTab(e) {
    e.preventDefault();
    if (activeTab === 1) return;
    setActiveTab((activeTab) => activeTab - 1);
  }
  return (
    <>
    { isloading && (<LoadingScreen isloading={isloading}/>) }
      <div className={styles.main}>
        <ToastContainer
          className='4xl:text-4xl'
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

        <Formik
          validateOnMount={true}
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
          // input check
          validationSchema={studentValidationSchema}
          onSubmit={(values) => {
            setIsloading(true);
            // kullanıcı 2 şifresini de doğru girerse artık "passwordConfirm" değerine ihtiyacımız olmayacak.
            // burada temizleriz. prisma hata veriyor (veri tabanında olmayan bir değer) gönderidğimiz için.
            delete values.passwordConfirm;

            // girilen telefonlarda boşlukları siler ve sonrasında son 10 haniesini alma
            values.phone = values.phone.replace(/\s/g, "").slice(-10);

            createStudent(values).then((res) => {
              if (res.status === 'success') {
                // Giriş başarılı ise ekrana "blur" efekti verir
                setIsloading(false);
                setIsRegister(true);

                toast.success(res.message + ' (Yönlendiriliyorsunuz...)');

                //Bilgi verir ve 5 saniye sonra login sayfasına yönlendirir.
                const timeOut = setInterval(() => {
                  router.push('/auth/login/student');
                  clearInterval(timeOut);
                }, 4000);

                values.password = '';
                values.passwordConfirm = '';
              } else {
                setIsloading(false);
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
            <Form
              onSubmit={props.handleSubmit}
              className={`${isRegister ? 'blur' : ''} ${styles.main_container} md:scale-75 2xl:scale-100 4xl:scale-125`}
            >
              <div className={styles.container}>
                <div className={styles.container_left_side}>
                  <img
                    className={styles.left_side_image}
                    src='https://source.unsplash.com/user/erondu/1600x900'
                    alt='img'
                  />
                </div>

                <div className={styles.container_right_side}>
                  <div className='w-full'>
                    <div className={styles.right_side_logo}>
                      <div
                        className={styles.right_side_logoImage}
                        fill='none'
                        stroke='currentColor'
                      >
                        <Image
                          src='/logo.png'
                          width='150'
                          height='150'
                          alt='logo'
                        />
                      </div>
                    </div>
                    <h1 className='mb-4 md:mb-8 tracking-wider uppercase mt-4 text-2xl 2xl:text-3xl 4xl:text-5xl font-bold text-center text-white bg-secondary p-4'>
                      Öğrenci Kayıt
                    </h1>
                    {/* Progress Bar (Stepper) */}
                    <div className='grid gap-8 mx-0 md:mx-8 row-gap-0 grid-cols-3 4xl:gap-40'>
                      {/* Progress Bar Step 1 */}
                      <div className='relative text-center z-10'>
                        <div
                          className={`text-white bg-white border-4 flex items-center justify-center w-14 4xl:w-28 4xl:h-28 4xl:mb-4 h-14 mx-auto mb-2 rounded-full ${
                            activeTab === 1
                              ? 'border-secondary'
                              : 'border-primary'
                          }`}
                        >
                          {activeTab === 1 ? (
                            <p className='text-secondary 4xl:text-5xl font-bold text-xl'>
                              1
                            </p>
                          ) : (
                            <FaCheck className='w-1/2 h-1/3 text-primary' />
                          )}
                        </div>
                        <h6 className={`mb-2 text-sm 4xl:text-3xl ${activeTab == 1 && "text-primary font-semibold"}`}>
                          Öğrenci Bilgileri
                        </h6>
                        <div className='top-0 right-0 4xl:-right-8 flex items-center justify-center h-16 -mr-24 my-20 absolute -z-10'>
                          <div
                            className={`${
                              activeTab === 1
                                ? 'border-secondary'
                                : 'border-primary'
                            } 4xl:w-28 w-[11rem] h-40 4xl:h-[25rem] absolute right-0  border-l-8 rotate-90 -z-10 flex justify-center items-center`}
                          ></div>
                        </div>
                      </div>
                      {/* Progress Bar Step 2 */}
                      <div className='relative text-center z-10'>
                        <div
                          className={`${
                            activeTab < 3 ? 'border-secondary' : 'border-primary'
                          } bg-white text-white  border-4 flex items-center justify-center w-14 4xl:w-28 4xl:h-28 4xl:mb-4 h-14 mx-auto mb-2 rounded-full`}
                        >
                          {activeTab < 3 ? (
                            <p className='text-secondary 4xl:text-5xl font-bold text-xl'>
                              2
                            </p>
                          ) : (
                            <FaCheck className='w-1/2 h-1/3 text-primary' />
                          )}
                        </div>
                        <h6 className={`mb-2 text-sm 4xl:text-3xl ${activeTab == 2 && "text-primary font-semibold"}`}>
                          Okul Bilgileri
                        </h6>
                        <div className='top-0 right-0 4xl:-right-8 flex items-center justify-center h-16 -mr-24 my-20 absolute -z-10'>
                          <div
                            className={`${
                              activeTab < 3
                                ? 'border-secondary'
                                : 'border-primary'
                            } 4xl:w-28 w-[11rem] h-40 4xl:h-[25rem] absolute right-0  border-l-8 rotate-90 flex -z-10 justify-center items-center`}
                          ></div>
                        </div>
                      </div>
                      {/* Progress Bar Step 3 */}
                      <div className='relative text-center z-10'>
                        <div className={`bg-white text-white border-4 ${isRegister ? "border-primary" : "border-secondary"} 4xl:border-4 flex items-center justify-center w-14 4xl:w-28 4xl:h-28 4xl:mb-4 h-14 mx-auto mb-2 rounded-full`}>
                          <p className='text-secondary 4xl:text-5xl font-bold text-xl w-3/4 flex justify-center'>
                            {isRegister ? <FaCheck className='w-1/2 h-1/3 text-primary' /> : "3"}
                          </p>
                        </div>
                        <h6 className={`mb-2 text-sm 4xl:text-3xl ${activeTab == 3 && !isRegister && "text-primary font-semibold"}`}>
                          Giriş Bilgileri
                        </h6>
                      </div>
                    </div>
                    <div className='block w-full opacity-100 4xl:mb-6 relative z-10'>
                      {/* Step 1 */}
                      <Transition
                        className='mx-8 my-4 max-w-full'
                        show={activeTab === 1}
                        enter='transition-all ease-in-out duration-500 delay-[200ms]'
                        enterFrom='opacity-0 translate-y-6'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition-all ease-in-out duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                      >

                        <div className={styles.container_first_row}>

                          <Input
                            labelValue='İsim'

                            id='name'
                            name='name'
                            type='text'
                            value={props.values.name}
                            onChange={props.handleChange}
                            placeholder='İsminizi giriniz.'
                            
                          />
                          {props.touched.name &&
                          <ErrorText >
                            {props.errors.name}
                          </ErrorText>
                          }
                          
                        </div>
                        <div className={styles.container_first_row}>
                        <Input
                            labelValue='Soyisim'

                            id='surname'
                            name='surname'
                            type='text'
                            value={props.values.surname}
                            onChange={props.handleChange}
                            placeholder='Soyisminizi giriniz.'
                            
                          />
                          {props.touched.surname &&
                            <ErrorText >
                              {props.errors.surname}
                            </ErrorText>
                           }
                        </div>
                        <div className={styles.container_middle_row}>
                        <Input
                            labelValue='Telefon'

                            id='phone'
                            name='phone'
                            type='text'
                            value={props.values.phone}
                            onChange={props.handleChange}
                            placeholder='5xxxxxxxxx'
                            
                          />
                          {props.touched.phone &&
                          <ErrorText >
                            {props.errors.phone}
                          </ErrorText>
                          }
                        </div>
                      </Transition>
                    </div>
                    <div className='w-full relative z-10'>
                      {/* Step 2 */}
                      <Transition
                        className='mx-8 my-4 max-w-full'
                        show={activeTab === 2}
                        enter='transition-all ease-in-out duration-500 delay-[200ms]'
                        enterFrom='opacity-0 translate-y-6'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition-all ease-in-out duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                      >
                        <div className='grid grid-cols-2 gap-2'>
                          <div>
                            <Select
                            labelValue='Okulun Bulunduğu İl'
                              id='city'
                              name='city'
                              value={props.values.city}
                              optionLabel='İl Seç'
                              onChange={(e) => {
                                props.handleChange(e);
                                setCity(e.target.value);
                                props.values.town = '';
                              }}
                            >
                              {cities.length > 0 &&
                                  cities.map((item, index) => {
                                    return (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    );
                              })}
                            </Select>

                            {props.touched.city &&
                              <ErrorText >
                                {props.errors.city}
                              </ErrorText>
                            }
                          </div>
                          <div>
                            <Select
                            labelValue='Okulun Bulunduğu İlçe'
                              id='town'
                              name='town'
                              value={props.values.town}
                              disabled={city ? false : true}
                              optionLabel='İlçe Seç'
                              onChange={(e) => {
                                props.handleChange(e);
                                setTown(e.target.value);
                                props.values.schollName = '';
                                props.values.schooltype = '';
                              }}
                            >
                              {towns?.length > 0 &&
                                towns.map((item, index) => {
                                  return (
                                    <option key={index} value={item}>
                                      {item}
                                    </option>
                                  );
                                })}
                            </Select>

                            {props.touched.town &&
                              <ErrorText >
                                {props.errors.town}
                              </ErrorText>
                            }
                        
                          </div>
                          <div>

                          <Select
                            labelValue='Okul Türü'
                              id='schooltype'
                              name='schooltype'
                              value={props.values.schooltype}
                              disabled={town ? false : true}
                              optionLabel='Okul Türü Seç'
                              onChange={(e) => {
                                props.handleChange(e);
                                !schollNames.length && setIsloading(true);
                                setSchooltype(e.target.value);
                                props.values.schollName = '';
                              }}
                            >
                              {town && (
                                <>
                                  <option value='anaokul'>Anaokulu</option>
                                  <option value='ilkokul'>İlkokul</option>
                                  <option value='ortaokul'>Ortaokul</option>
                                  <option value='lise'>Lise</option>
                                  <option value='diger'>
                                    Okulum Listede Yok
                                  </option>
                                </>
                              )}
                            </Select>

                            {props.touched.schooltype &&
                              <ErrorText >
                                {props.errors.schooltype}
                              </ErrorText>
                            }

                          </div>
                          {props.values.schooltype === 'diger' ? (
                            <div>
                              <Input
                                  labelValue='Okul İsmi'

                                  id='schollName'
                                  name='schollName'
                                  type='text'
                                  disabled={schooltype ? false : true}
                                  value={props.values.schollName}
                                  onChange={props.handleChange}
                                  placeholder='Soyisminizi giriniz.'
                                  
                                />
                                {props.touched.schollName &&
                                  <ErrorText >
                                    {props.errors.schollName}
                                  </ErrorText>
                                }
                              
                            </div>
                          ) : (
                            <div>
                              <Select
                            labelValue='Okul İsmi'
                              id='schollName'
                              name='schollName'
                              value={props.values.schollName}
                              disabled={schooltype ? false : true}
                              optionLabel='Okul Seç'
                              onChange={(e) => {
                                props.handleChange(e);
                              }}
                            >
                              {schollNames.length > 0 &&
                                  props.values.schooltype &&
                                  schollNames.map((item, index) => {
                                    return (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    );
                              })}
                            </Select>

                            {props.touched.schollName &&
                              <ErrorText >
                                {props.errors.schollName}
                              </ErrorText>
                            }
                            </div>
                          )}
                        </div>
                        <div>
                        <Select
                            labelValue='Sınıf'
                              id='class'
                              name='class'
                              value={props.values.class}
                              disabled={schooltype ? false : true}
                              optionLabel='Sınıf Seç'
                              onChange={props.handleChange}
                            >
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
                            </Select>

                            {props.touched.class &&
                              <ErrorText >
                                {props.errors.class}
                              </ErrorText>
                            }

                        </div>
                      </Transition>
                    </div>
                    <div className='w-full relative z-10'>
                      {/* Step 3 */}
                      <Transition
                        className='mx-8 my-4 max-w-full'
                        show={activeTab === 3}
                        enter='transition-all ease-in-out duration-500 delay-[200ms]'
                        enterFrom='opacity-0 translate-y-6'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition-all ease-in-out duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                      >
                        <div className={styles.container_end_row}>
                        <Input
                            labelValue='E-mail'

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
                        <div className={styles.container_end_row}>
                        <Input
                            labelValue='Şifre'

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
                        <div className={styles.container_end_row}>

                        <Input
                            labelValue='Şifre Doğrulama'

                            id='passwordConfirm'
                            name='passwordConfirm'
                            type='password'
                            value={props.values.passwordConfirm}
                            onChange={props.handleChange}
                            placeholder='******'
                            
                          />
                          {props.touched.passwordConfirm &&
                          <ErrorText >
                            {props.errors.passwordConfirm}
                          </ErrorText>
                          }

                        </div>
                      </Transition>
                    </div>
                    <div className='flex justify-center items-center flex-col w-full'>
                      {/* Next, Prev, Submit Buttons */}
                      <div className='w-full px-8 flex justify-center gap-10'>
                        {/* Prev Button */}
                        {activeTab >= 2 && (
                          <button
                            type='button'
                            onClick={(e) => prevActiveTab(e)}
                            className='mb-6 w-1/4 4xl:text-6xl text-white bg-secondary border rounded-md p-4 hover:bg-[#595959]'
                          >
                            Geri
                          </button>
                        )}
                        {/* Next Button */}
                        {activeTab < 3 && (
                          <button
                            type='button'
                            onClick={(e) => nextActiveTab(e, props)}
                            className={`${
                              activeTab === 1 ? 'w-full' : 'w-3/4'
                            } mb-6 text-white text-xl bg-primary 4xl:text-4xl border rounded-md p-4 hover:bg-primarydark`}
                          >
                            Sonraki Sayfa
                          </button>
                        )}
                        {/* Submit Button */}
                        {activeTab === 3 && (
                          <button
                            disabled={isloading  == true ||  isRegister == true}
                            
                            type='submit'
                            className={`${isloading == true ||  isRegister == true ? "bg-secondary" : "bg-primary"}  w-3/4 mb-6 text-white text-xl 4xl:text-6xl border rounded-md p-4 hover:bg-primarydark`}
                          >
                            Kayıt Ol
                          </button>
                        )}
                      </div>
                      <div className='text-center mb-4'>
                        <p className='text-md 2xl:text-xl 4xl:xl:text-2xl'>
                          Zaten bir hesabınız var mı?
                          <Link
                            href='/auth/login/student'
                            className='text-primary font-semibold hover:underline '
                          >
                            {' '}
                            Öğrenci Giriş.
                          </Link>
                        </p>
                      </div>
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
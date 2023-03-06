'use client';
import { createStudent } from '@/services/auth/register/student/index';
import getAdress from '@/services/auth/register/getAdress';
import { Formik, Form } from 'formik';
import Image from "next/image";
import studentValidationSchema from './formikData';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './studentRegister.module.css';
import { Transition } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';

export default function StudentRegisterComponent({ CitiesData }) {
  // şehirlerin listesini containerdan prop olarak alırız.
  const cities = CitiesData.data;

  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [towns, setTowns] = useState('');
  const [schooltype, setSchooltype] = useState('');

  const [schollNames, setschollNames] = useState('');

  const [isLogin, setIsLogin] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

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
    <div className={styles.main}>
      <ToastContainer
        className="4xl:text-4xl"
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
        validateOnMount={true}
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
        // input check
        validationSchema={studentValidationSchema}
        onSubmit={(values) => {
          // kullanıcı 2 şifresini de doğru girerse artık "passwordConfirm" değerine ihtiyacımız olmayacak.
          // burada temizleriz. prisma hata veriyor (veri tabanında olmayan bir değer) gönderidğimiz için.
          delete values.passwordConfirm;
          createStudent(values).then((res) => {
            if (res.status === "success") {
              // Giriş başarılı ise ekrana "blur" efekti verir
              setIsLogin(true);

              toast.success(res.message + " (Yönlendiriliyorsunuz...)");

              //Bilgi verir ve 5 saniye sonra login sayfasına yönlendirir.
              const timeOut = setInterval(() => {
                router.push("/auth/login/student");
                clearInterval(timeOut);
              }, 4000);

              values.password = "";
              values.passwordConfirm = "";
            } else {
              // girilen mail adresi daha önce kullanılmış ise hata mesajı verir. ve şifreleri temizler.
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
                  <h1 className="mb-4 md:mb-8 tracking-wider uppercase mt-4 text-2xl md:text-4xl font-bold text-center  text-white bg-secondary p-4">
                    Öğrenci Kayıt
                  </h1>
                  {/* Progress Bar (Stepper) */}
                  <div className="grid gap-8 mx-0 md:mx-8 row-gap-0 grid-cols-3 4xl:gap-40">
                    {/* Progress Bar Step 1 */}
                    <div className="relative text-center z-10">
                      <div className="bg-white text-white border-4 border-secondary flex items-center justify-center w-14 4xl:w-28 4xl:h-28 4xl:mb-4 h-14 mx-auto mb-4 rounded-full">
                        {activeTab === 1 ? (
                          <p className="text-secondary 4xl:text-5xl font-bold text-xl">
                            1
                          </p>
                        ) : (
                          <FaCheck className="w-1/2 h-1/3 text-primary" />
                        )}
                      </div>
                      <h6 className="mb-2 text-sm 4xl:text-3xl">
                        Öğrenci Bilgileri
                      </h6>
                      <div className="top-0 right-0 4xl:-right-8 flex items-center justify-center h-16 -mr-24 my-20 absolute -z-10">
                        <div className="4xl:w-28 w-[11rem] h-40 4xl:h-[25rem] absolute right-0 border-secondary border-l-8 rotate-90 -z-10 flex justify-center items-center"></div>
                      </div>
                    </div>
                    {/* Progress Bar Step 2 */}
                    <div className="relative text-center z-10">
                      <div className="bg-white text-white  border-4 border-secondary flex items-center justify-center w-14 4xl:w-28 4xl:h-28 4xl:mb-4 h-14 mx-auto mb-4 rounded-full">
                        {activeTab < 3 ? (
                          <p className="text-secondary 4xl:text-5xl font-bold text-xl">
                            2
                          </p>
                        ) : (
                          <FaCheck className="w-1/2 h-1/3 text-primary" />
                        )}
                      </div>
                      <h6 className="mb-2 text-sm 4xl:text-3xl">
                        Okul Bilgileri
                      </h6>
                      <div className="top-0 right-0 4xl:-right-8 flex items-center justify-center h-16 -mr-24 my-20 absolute -z-10">
                        <div className="4xl:w-28 w-[11rem] h-40 4xl:h-[25rem] absolute right-0 border-secondary border-l-8 rotate-90 flex -z-10 justify-center items-center"></div>
                      </div>
                    </div>
                    {/* Progress Bar Step 3 */}
                    <div className="relative text-center z-10">
                      <div className="bg-white text-white border-4 border-secondary 4xl:border-4 flex items-center justify-center w-14 4xl:w-28 4xl:h-28 4xl:mb-4 h-14 mx-auto mb-4 rounded-full">
                        <p className="text-secondary 4xl:text-5xl font-bold text-xl">
                          3
                        </p>
                      </div>
                      <h6 className="mb-2 text-sm 4xl:text-3xl text-">
                        Giriş Bilgileri
                      </h6>
                    </div>
                  </div>
                  <div className="block w-full opacity-100 4xl:mb-6 relative z-10">
                    {/* Step 1 */}
                    <Transition
                      className="mx-8 my-4 max-w-full"
                      show={activeTab === 1}
                      enter="transition-all ease-in-out duration-500 delay-[200ms]"
                      enterFrom="opacity-0 translate-y-6"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition-all ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className={styles.container_first_row}>
                        <label className={styles.inputLabel} htmlFor="name">
                          İsim
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={props.values.name}
                          onChange={props.handleChange}
                          placeholder="İsminizi giriniz."
                          className={styles.inputClass}
                        />
                        <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                          {props.touched.name && props.errors.name}
                        </p>
                      </div>
                      <div className={styles.container_first_row}>
                        <label className={styles.inputLabel} htmlFor="surname">
                          Soyisim
                        </label>
                        <input
                          id="surname"
                          name="surname"
                          type="text"
                          value={props.values.surname}
                          onChange={props.handleChange}
                          placeholder="Soyisminizi giriniz."
                          className={styles.inputClass}
                        />
                        <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                          {props.touched.surname && props.errors.surname}
                        </p>
                      </div>
                      <div className={styles.container_middle_row}>
                        <label className={styles.inputLabel} htmlFor="phone">
                          Telefon
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="text"
                          value={props.values.phone}
                          onChange={props.handleChange}
                          placeholder="5xxxxxxxxx"
                          className={styles.inputClass}
                        />
                        <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                          {props.touched.phone && props.errors.phone}
                        </p>
                      </div>
                    </Transition>
                  </div>
                  <div className="w-full relative z-10">
                    {/* Step 2 */}
                    <Transition
                      className="mx-10 my-4 max-w-full"
                      show={activeTab === 2}
                      enter="transition-all ease-in-out duration-500 delay-[200ms]"
                      enterFrom="opacity-0 translate-y-6"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition-all ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={styles.inputLabel} htmlFor="city">
                            Okulun Bulunduğu İl
                          </label>
                          <select
                            id="city"
                            name="city"
                            value={props.values.city}
                            onChange={(e) => {
                              props.handleChange(e);
                              setCity(e.target.value);
                              props.values.town = "";
                            }}
                            className={styles.inputClass}
                          >
                            <option label="İl Seç"></option>
                            {cities.length > 0 &&
                              cities.map((item, index) => {
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                          </select>
                          <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                            {props.touched.city && props.errors.city}
                          </p>
                        </div>
                        <div>
                          <label className={styles.inputLabel} htmlFor="city">
                            Okulun Bulunduğu İlçe
                          </label>
                          <select
                            id="town"
                            name="town"
                            disabled={city ? false : true}
                            value={props.values.town}
                            onChange={(e) => {
                              props.handleChange(e);
                              setTown(e.target.value);
                              props.values.schollName = "";
                              props.values.schooltype = "";
                            }}
                            className={styles.inputClass}
                          >
                            <option label="İlçe Seç"></option>
                            {towns.length > 0 &&
                              towns.map((item, index) => {
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                          </select>
                          <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                            {props.touched.town && props.errors.town}
                          </p>
                        </div>
                        <div>
                          <label
                            className={styles.inputLabel}
                            htmlFor="schooltype"
                          >
                            Okul Türü
                          </label>
                          <select
                            id="schooltype"
                            name="schooltype"
                            disabled={town ? false : true}
                            value={props.values.schooltype}
                            onChange={(e) => {
                              props.handleChange(e);
                              setSchooltype(e.target.value);
                              props.values.schollName = "";
                            }}
                            className={styles.inputClass}
                          >
                            <option label="Okul Türü Seç">Okul Türü Seç</option>
                            {town && (
                              <>
                                <option value="anaokul">Anaokulu</option>
                                <option value="ilkokul">İlkokul</option>
                                <option value="ortaokul">Ortaokul</option>
                                <option value="lise">Lise</option>
                                <option value="diger">
                                  Okulum Listede Yok
                                </option>
                              </>
                            )}
                          </select>
                          <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                            {props.touched.schooltype &&
                              props.errors.schooltype}
                          </p>
                        </div>
                        {props.values.schooltype === "diger" ? (
                          <div>
                            <label
                              className={styles.inputLabel}
                              htmlFor="schollName"
                            >
                              Okul İsmi
                            </label>
                            <input
                              id="schollName"
                              name="schollName"
                              type="text"
                              disabled={schooltype ? false : true}
                              value={props.values.schollName}
                              onChange={props.handleChange}
                              placeholder="Okul İsmini Gir"
                              className={styles.inputClass}
                            />
                            <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                              {props.touched.schollName &&
                                props.errors.schollName}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <label
                              className={styles.inputLabel}
                              htmlFor="schollName"
                            >
                              Okul İsmi
                            </label>
                            <select
                              id="schollName"
                              name="schollName"
                              disabled={schooltype ? false : true}
                              value={props.values.schollName}
                              onChange={(e) => {
                                props.handleChange(e);
                              }}
                              className={styles.inputClass}
                            >
                              <option label="Okul Seç"></option>
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
                            <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                              {props.touched.schollName &&
                                props.errors.schollName}
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
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
                        <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                          {props.touched.class && props.errors.class}
                        </p>
                      </div>
                    </Transition>
                  </div>
                  <div className="w-full relative z-10">
                    {/* Step 3 */}
                    <Transition
                      className="mx-8 my-4 max-w-full"
                      show={activeTab === 3}
                      enter="transition-all ease-in-out duration-500 delay-[200ms]"
                      enterFrom="opacity-0 translate-y-6"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition-all ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className={styles.container_end_row}>
                        <label className={styles.inputLabel} htmlFor="email">
                          E-mail
                        </label>
                        <input
                          id="email"
                          name="email"
                          autoComplete="off"
                          type="email"
                          value={props.values.email}
                          onChange={props.handleChange}
                          placeholder="Mail adresinizi giriniz."
                          className={styles.inputClass}
                        />
                        <p className=" 4xl:text-2xl text-red-500 text-xs italic px-2 pb-2">
                          {props.touched.email && props.errors.email}
                        </p>
                      </div>
                      <div className={styles.container_end_row}>
                        <label className={styles.inputLabel} htmlFor="password">
                          Şifre
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={props.values.password}
                          onChange={props.handleChange}
                          placeholder="******"
                          className={styles.inputClass}
                        />
                        <p className=" 4xl:text-2xltext-red-500 text-xs italic px-2 pb-2">
                          {props.touched.password && props.errors.password}
                        </p>
                      </div>
                      <div className={styles.container_end_row}>
                        <label
                          className={styles.inputLabel}
                          htmlFor="passwordConfirm"
                        >
                          Şifre Doğrulama
                        </label>
                        <input
                          id="passwordConfirm"
                          name="passwordConfirm"
                          type="password"
                          value={props.values.passwordConfirm}
                          onChange={props.handleChange}
                          placeholder="******"
                          className={styles.inputClass}
                        />
                        <p className=" 4xl:text-2xltext-red-500 text-xs italic">
                          {props.touched.passwordConfirm &&
                            props.errors.passwordConfirm}
                        </p>
                      </div>
                    </Transition>
                  </div>
                  <div className="flex justify-center items-center flex-col w-full">
                    {/* Next, Prev, Submit Buttons */}
                    <div className="w-full px-8 flex justify-center gap-10">
                      {/* Prev Button */}
                      {activeTab >= 2 && (
                        <button
                          type="button"
                          onClick={(e) => prevActiveTab(e)}
                          className="mb-6 w-1/4 4xl:text-6xl text-white bg-[#777779] border rounded-md p-4 hover:bg-[#8a8a8a]"
                        >
                          Geri
                        </button>
                      )}
                      {/* Next Button */}
                      {activeTab < 3 && (
                        <button
                          type="button"
                          onClick={(e) => nextActiveTab(e, props)}
                          className={`${
                            activeTab === 1 ? "w-full" : "w-3/4"
                          } mb-6 text-white text-xl bg-primary 4xl:text-6xl border rounded-md p-4 hover:bg-primarydark`}
                        >
                          Sonraki Sayfa
                        </button>
                      )}
                      {/* Submit Button */}
                      {activeTab === 3 && (
                        <button type="submit" className={styles.submit_button}>
                          Kayıt Ol
                        </button>
                      )}
                    </div>
                    <div className="text-center mb-4">
                    <p className="text-md">
                    Zaten bir hesabınız var mı?<Link href="/auth/login/student" className="text-primary font-semibold hover:underline "> Öğrenci Giriş.</Link>
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
  );
}

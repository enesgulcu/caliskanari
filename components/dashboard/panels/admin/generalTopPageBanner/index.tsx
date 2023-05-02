import React, { useState } from "react";
import { Formik, Form } from "formik";
import { HexColorPicker } from "react-colorful";
import calculateTime from "@/functions/other/calculateTime"

const GeneralTopPageBanner: React.FC = () => {

  
  const [color, setColor] = useState("#aabbcc");
  const [time, setTime] = useState("");

  const {months, days, hours, minutes, seconds} = calculateTime(time);


  // Arkaplan rengi, arkaplan resmi veya arkaplan videosu
  // ay, gün, saat, dakika, saniye geri sayımı yapan yapı (takvimden seçilen tarihe göre)
  // paragraf yazısı - yazının rengi -
  // button - butonun gideceği adres - butonun yazısı - butonun rengi - butonun ikonu - butonun ikonunun rengi
  return (
    <div style={{background:color}} className={`w-full p-2`}>
      <Formik
        // input verileri
        initialValues={{
          email: "",
        }}
        // input check
        //validationSchema={ValidationSchema}

        onSubmit={(values) => {
          
        }}
      >
        {(props) => (
          <Form
            onSubmit={props.handleSubmit}
          >
            <div>
              <HexColorPicker color={color} onChange={setColor}/>
              {color}
            </div>
            <div className="relative">
              <input  type="datetime-local" id="meeting-time" placeholder="Select.." 
              className=" bg-white p-4 text-lg text-secondary rounded fill-secondary"
              name="meeting-time" value={time} onChange={(e)=>setTime(e.target.value)}
              min={Date.now()} />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
    <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M14 2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8zm-2.293 1.293a1 1 0 00-1.414 0L10 4.586l-1.293-1.293a1 1 0 00-1.414 1.414L8.586 6l-1.293 1.293a1 1 0 000 1.414 1 1 0 001.414 0L10 7.414l1.293 1.293a1 1 0 001.414-1.414L11.414 6l1.293-1.293a1 1 0 000-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </span>
            </div>
            <div className="mt-4">
              <label className="block text-sm">Email</label>
              <input
                id="email"
                name="email"
                autoComplete="off"
                type="email"
                value={props.values.email}
                onChange={props.handleChange}
                placeholder="Mail adresinizi giriniz."
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralTopPageBanner;

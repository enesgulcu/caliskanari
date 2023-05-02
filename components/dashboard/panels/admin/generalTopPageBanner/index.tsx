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
            <div>
              <input type="datetime-local" id="meeting-time"
              name="meeting-time" value={time} onChange={(e)=>setTime(e.target.value)}
              min={Date.now()} />
              

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

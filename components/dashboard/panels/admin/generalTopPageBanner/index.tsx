import React from "react";
import { Formik, Form } from "formik";

const GeneralTopPageBanner: React.FC = () => {
  // Arkaplan rengi, arkaplan resmi veya arkaplan videosu
  // ay, gün, saat, dakika, saniye geri sayımı yapan yapı (takvimden seçilen tarihe göre)
  // paragraf yazısı - yazının rengi -
  // button - butonun gideceği adres - butonun yazısı - butonun rengi - butonun ikonu - butonun ikonunun rengi
  return (
    <div className="w-full p-2 bg-red-600">
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

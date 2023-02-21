import * as Yup from 'yup';

const studentValidationSchema = Yup.object({
    name: Yup.string()
    .required('İsim alanı boş bırakılamaz.')
    .typeError('Yanlış bir değer girdiniz.')
    .matches(/^[a-zA-ZğüşöçıİĞÜŞÖÇ ]*$/, 'isim sadece harf içerebilir.')
    .max(30, 'İsim alanı en fazla 30 karakter olmalıdır.'),

    surname: Yup.string()
    .required('Soyisim alanı boş bırakılamaz.')
    .typeError('Yanlış bir değer girdiniz.')
    .max(30, 'Soyisim alanı en fazla 30 karakter olmalıdır.')
    .matches(/^[a-zA-ZğüşöçıİĞÜŞÖÇ ]*$/, 'isim sadece harf içerebilir.')
    .trim( 'Soyisim alanı boşluk içeremez.'),

    age: Yup.number()
    .required('Yaş alanı boş bırakılamaz.')
    .typeError('Yanlış bir değer girdiniz.')
    .max(99, "Yanlış bir değer girdiniz.")
    .moreThan(0, 'Yanlış bir değer girdiniz.')
    .typeError('Lütfen bir sayı giriniz'),

    phone: Yup.string()
    .required('Telefon alanı boş bırakılamaz.')
    .max(17, 'Telefon numaranızı Lütfen Örnekteki gibi giriniz ( 555 555 55 55 )')
    .min(10, 'Telefon numaranızı Lütfen Örnekteki gibi giriniz ( 555 555 55 55 )')
    .matches(/^[0-9+ ]*$/, 'Telefon numaranızı Lütfen Örnekteki gibi giriniz ( 555 555 55 55 )'),

    city: Yup.string()
    .required('Şehir seçimi boş bırakılamaz.'),

    town: Yup.string()
    .required('İlçe seçimi boş bırakılamaz.'),

    neighborhood: Yup.string()
    .required('İlçe seçimi boş bırakılamaz.'),

    class: Yup.string()
    .required('Lütfen Sınıfınızı Seçiniz.')
    .max(10, "Yanlış bir değer girdiniz.")
    .min(1, "Sınıfınız 1-12 arasında olmalıdır"),

    email: Yup.string()
    .required('e mail boş bırakılamaz.')
    .email('Geçerli bir e mail adresi giriniz.'),

    password: Yup.string()
    .required('Şifre boş bırakılamaz!')
    .min(6, 'şifre çok kısa minumum 6 karakter giriniz!')
    .matches(/[a-zA-Z]/, 'Şifre en az bir harf içermelidir!'),  

    passwordConfirm: Yup.string()
    .required('Şifre doğrulama boş bırakılamaz!')
    .oneOf([Yup.ref('password'),null], 'Şifre Eşleşmiyor!')
});

export default studentValidationSchema;
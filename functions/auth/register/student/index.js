// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import prisma from "@/lib/prisma/index";
import {getStudentByEmail, updateStudentEmail} from "@/services/student/index";

// POST
export async function createStudent(student) {


    try {
      // Veritabanından öğrenci ile eşleşen bir kayıt var mı kontrol et
      let mailCheck = await getStudentByEmail(student.email);
      mailCheck = mailCheck.student;
      const verifyMailCheck = await prisma.studentVerify.findUnique({
        where: {
          email: student.email
        },
      })

      // Eğer öğrenci ile eşleşen bir kayıt varsa hata döndür
      if (verifyMailCheck != null && verifyMailCheck.email == student.email) {
        return { error: "E-mail adresine bağlı kayıtlı bir hesap bulunmaktadır."};
      }

      
      
       // Eğer öğrenci ile eşleşen bir kayıt varsa hata döndür
       else if (mailCheck != null && mailCheck.email == student.email) {
  
          const studentFromDB = updateStudentEmail(mailCheck.email, student);
      
      }

      

      else{
        // Eğer öğrenci ile eşleşen bir kayıt yoksa yeni kayıt oluştur
        const studentFromDB = await prisma.student.create({ data: student });
        return { student: studentFromDB };
      }            
    } catch (error) {
      return { error };
    }
  }


      // TELEFON KONTROL İSTEĞİ (DURDURULDU ŞİMDİLİK!)
      // const phoneCheck = await prisma.student.findUnique({
      //   where: {
      //     phone: student.phone
      //   },
      // })



      // TELEFON KONTROL KOŞULU (DURDURULDU ŞİMDİLİK!)
      // // Eğer öğrenci ile eşleşen bir kayıt varsa hata döndür
      // else if (phoneCheck != null && phoneCheck.phone == student.phone) {
      //   return { error: "Girdiğiniz telefon numarası ile daha önce kayıt yapılmış." };
      // }   

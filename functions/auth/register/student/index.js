// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import prisma from "@/lib/prisma/index";



// POST
export async function createStudent(student) {


    try {
      // Veritabanından öğrenci ile eşleşen bir kayıt var mı kontrol et
      const mailCheck = await prisma.student.findUnique({
        where: {
          email: student.email
        },
      })

      // TELEFON KONTROL İSTEĞİ (DURDURULDU ŞİMDİLİK!)
      // const phoneCheck = await prisma.student.findUnique({
      //   where: {
      //     phone: student.phone
      //   },
      // })
      
       // Eğer öğrenci ile eşleşen bir kayıt varsa hata döndür
       if (mailCheck != null && mailCheck.email == student.email) {
        return { error: "Girdiğiniz mail adresi ile daha önce kayıt yapılmış." };
      }

      // TELEFON KONTROL KOŞULU (DURDURULDU ŞİMDİLİK!)
      // // Eğer öğrenci ile eşleşen bir kayıt varsa hata döndür
      // else if (phoneCheck != null && phoneCheck.phone == student.phone) {
      //   return { error: "Girdiğiniz telefon numarası ile daha önce kayıt yapılmış." };
      // }   

      else{
        // Eğer öğrenci ile eşleşen bir kayıt yoksa yeni kayıt oluştur
        const studentFromDB = await prisma.student.create({ data: student });
        return { student: studentFromDB };
      }            
    } catch (error) {
      return { error };
    }
  }

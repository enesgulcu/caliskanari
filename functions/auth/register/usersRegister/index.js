// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import prisma from "@/lib/prisma/index";
import { getUserByEmail, updateUserEmail, createUser } from "@/services/usersAllProcess/index";

export async function createNewUser(user) {
  try {
    // Doğrulanmamış kullanıcı kontrolü
    let mailCheck = await getUserByEmail(user.role, user.email);
    mailCheck = mailCheck.user;

    // Doğrulanmış kullanıcı kontrolü
    let verifyMailCheck = await getUserByEmail(`${user.role + "Verify"}`, user.email);
    verifyMailCheck = verifyMailCheck.user;

    // eğer doğrulanmış bir hesaba bağlı bir kayıt varsa hata döndür
    if (verifyMailCheck != null && verifyMailCheck.email == user.email) {
      return { error: "Bu e-mail adresine kayıtlı başka bir hesap bulunmaktadır." };
    } 

    // eğer doğrulanmamış bir hesaba bağlı bir kayıt varsa yen iveriyi üzerine yaz
    else if (mailCheck != null && mailCheck.email == user.email) {
      const userFromDB = await updateUserEmail(mailCheck.role, mailCheck.email, user);
      return { user: userFromDB };
    }

    else {
      const userFromDB = await createUser(user.role, user);
      return { user: userFromDB };
    }          
  } 
  catch (error) {
    return { error };
  }
}



      // TELEFON KONTROL İSTEĞİ (DURDURULDU ŞİMDİLİK!)
      // const phoneCheck = await prisma.user.findUnique({
      //   where: {
      //     phone: user.phone
      //   },
      // })



      // TELEFON KONTROL KOŞULU (DURDURULDU ŞİMDİLİK!)
      // // Eğer öğrenci ile eşleşen bir kayıt varsa hata döndür
      // else if (phoneCheck != null && phoneCheck.phone == user.phone) {
      //   return { error: "Girdiğiniz telefon numarası ile daha önce kayıt yapılmış." };
      // }   

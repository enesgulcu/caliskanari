// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import { getUserByEmail, createUser } from "@/services/usersAllProcess/index";

export async function createNewUser(user) {
  try {

    // kullanıcı kontrolü
    let mailCheck = await getUserByEmail(user.role, user.email);
    mailCheck = mailCheck.user;

    // eğer doğrulanmamış bir hesaba bağlı bir kayıt varsa yen iveriyi üzerine yaz
    if (mailCheck != null) {
      return { error: "Bu e-mail adresine kayıtlı başka bir hesap bulunmaktadır. Şifremi unuttum bölümünden şifrenizi sıfırlayabilirsiniz." };
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

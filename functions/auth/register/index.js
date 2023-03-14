// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import { getDataByUnique, createNewData } from "@/services/serviceOperations";

export async function createNewUser(user) {
  try {
    
    // kullanıcı kontrolü
    const mailCheck = await getDataByUnique(user.role, {email: user.email});
 
    

    // eğer doğrulanmamış bir hesaba bağlı bir kayıt varsa yen iveriyi üzerine yaz
    if (mailCheck != null ) {
      return { error: "Bu e-mail adresine kayıtlı başka bir hesap bulunmaktadır. Şifremi unuttum bölümünden şifrenizi sıfırlayabilirsiniz." };
    }


    else {
      const userFromDB = await createNewData(user.role, user);

      // Kayıt olan her kullanıcıyı tek tabloda birleştiririz. 
      const AllUserFromDB = await createNewData("AllUser", {
        email: user.email,
        role : user.role,
        name : user.name,
        surname : user.surname,
      });
      return userFromDB;
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

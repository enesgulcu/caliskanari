import { getDataByUnique, updateDataByAny, deleteDataByMany } from "@/services/serviceOperations";

import DecryptPassword from "@/functions/auth/decryptPassword"



export default async function VerifyEmail({key, email, role}) {

   try {
      
    const verifyEmailData = await getDataByUnique("VerifyEmail", {secretKey: key});
    
     if(!verifyEmailData || verifyEmailData.error  || verifyEmailData == null) {
        throw new Error("Mail Doğrulama Linki Geçersizdir.");
     }

      const now = Date.now();
      const LifeTime = now - verifyEmailData.validTime;
      const pastHour = Math.floor((LifeTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if(pastHour >= 24){
         throw new Error("Mail Doğrulama Linkinin Geçerlilik Süresi Bitmiştir. Lütfen Yeni Bir Mail Doğrulama Talebinde Bulununuz.");
      }

      const  verify = await DecryptPassword(verifyEmailData.email, email)
      
      if(!verify) {
         throw new Error("Girdiğiniz Mail Adresi Geçersizdir.");
      }

      const mailCheck = await getDataByUnique(role, {email: verifyEmailData.email});


    if (!mailCheck || mailCheck.role !== role || mailCheck == null || mailCheck.error) {
      throw new Error("Kullanıcı kaydı bulunamadı.");
    }

    if (mailCheck.verified){ 
      throw new Error("Mail adresiniz zaten onaylanmış.");
    }

    const userFromDB = await updateDataByAny(role, {email: verifyEmailData.email}, { verified: true});
   
    const deleteVerifyEmail = await deleteDataByMany ("VerifyEmail", {email: verifyEmailData.email});

    if (!userFromDB || userFromDB.error || !deleteVerifyEmail || deleteVerifyEmail.error) {
      throw new Error("Mail adresiniz onaylanamadı bir hata ile karşılaşıldı!");
    }

    return {status: "success", message: "Mail adresiniz başarıyla onaylandı!"};

   } catch (error) {
      
      return {error: error?.message};
   }

}
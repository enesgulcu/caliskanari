import { getDataByUnique } from "@/services/serviceOperations";
import DecryptPassword from "@/functions/auth/decryptPassword"


export default async function ResetPassword(searchParams) {
   try {
    
    const forgetPasswordData = await getDataByUnique("ForgotPassword", {secretKey: searchParams.key});
     if(!forgetPasswordData) {
        throw new Error("Şifre Sıfırlama Linki Geçersizdir.");
     }

        const now = Date.now();
        const LifeTime = now - forgetPasswordData.validTime;
        const pastHour = Math.floor((LifeTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

         if(pastHour >= 24){
            throw new Error("Şifre Sıfırlama Linkinin Geçerlilik Süresi Bitmiştir. Lütfen Yeni Bir Şifre Sıfırlama Talebinde Bulununuz.");
         }

         const  verify = await DecryptPassword(forgetPasswordData.email, searchParams.email)
     
         if(!verify) {
            throw new Error("Girdiğiniz Mail Adresi Geçersizdir.");
         }

         return {success: true};


        
   } catch (error) {
        return {error : error.message};
   }

}
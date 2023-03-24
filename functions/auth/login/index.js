// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import {getDataByUnique} from '@/services/serviceOperations'
import DecryptPassword from '@/functions/auth/decryptPassword'

// POST
export default async function loginFunction({role, email, password}) {
    

    try {
        const userFromDB = await getDataByUnique(role, {email: email})
        
        if(!userFromDB) {
            throw new Error("Bu mail adresi ile kayıtlı bir kullanıcı bulunamadı.");
        }
        
        const PasswordFromDB = role == "Admin" ? userFromDB.password + process.env.ADMIN_PASSWORD : userFromDB.password;
        
        const passwordCheck = await DecryptPassword(password, PasswordFromDB);
        
        if(!passwordCheck) throw new Error("Mail adresi veya şifre hatalı.");

        if(role != "Admin" && userFromDB.verified == false){
            let error2 = new Error('Mail Adresi doğrulanmamış. Lütfen mail adresinizi doğrulayınız.');
            error2.status = 500;
            error2.verify = false;
            throw error2;
         }

        return {success: true, userFromDB: userFromDB};
    } catch (error) {   
        return {success: false, error: error, status: error.status, verifyEmail: error.verify};
    }

}
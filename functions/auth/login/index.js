// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import {getDataByUnique} from '@/services/serviceOperations'
import DecryptPassword from '@/functions/auth/decryptPassword'

// POST
export default async function loginFunction({role, email, password}) {
    

    try {
        const userFromDB = await getDataByUnique(role, {email: email})
        
        

        if(!userFromDB) throw new Error("Bu mail adresi ile kayıtlı bir kullanıcı bulunamadı.");
        

        

        const PasswordFromDB = role == "Admin" ? userFromDB.password + process.env.ADMIN_PASSWORD : userFromDB.password;
        
        const passwordCheck = await DecryptPassword(password, PasswordFromDB);
        
        if(!passwordCheck) throw new Error("Mail adresi veya şifre hatalı.");

        if(role != "Admin" && userFromDB.verified == false){
            let error = new Error('Lütfen mail adresinizi doğrulayınız.');
            error.status = 400;
            error.verify = false;
            throw error;
         }

        return {success: true, userFromDB: userFromDB};
    } catch (error) {   
        return {success: false, error: error};
    }

}
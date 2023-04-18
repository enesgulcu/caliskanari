// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import {getDataByUnique} from '@/services/serviceOperations'
import DecryptPassword from '@/functions/auth/decryptPassword'

 interface Props{
    role: string;
    email: string;
    password: string;
 }

 interface pageReturnPromise{
    success:boolean,
    userFromDB:{
        id: string,
        verified:boolean,
        role:string,
        name:string,
        surname:string,
        phone:number,
        city:string,
        town:string,
        schooltype?:string,
        schoolName?:string,
        class?:string,
        email:string,
        password:string,
        createdAt:Date,
        updateAt:Date,
    },
    status?:string,
    verifyEmail?:boolean
 }

// POST
const loginFunction = async ({role, email, password}:Props): Promise< pageReturnPromise | {error:any}> => {
    

    try {
        if(!email || !password || !role){
            throw new Error("Girdiğiniz bilgilerde hata var. Lütfen kontrol ediniz.");
        }

        const userFromDB = await getDataByUnique(role, {email: email})
        
        if(!userFromDB || userFromDB.error || userFromDB == null || userFromDB == undefined) {
            throw new Error("Mail adresi veya şifre hatalı.");
        }

        // admin şifresi ile standart kullanıcı şifresini ayrıştırır. admin için güvenlik sağlar.
        const PasswordFromDB = role == "Admin" ? userFromDB.password + process.env.ADMIN_PASSWORD : userFromDB.password;
        
        const passwordCheck:boolean = await DecryptPassword(password, PasswordFromDB);
        
        if(!passwordCheck || passwordCheck == null || passwordCheck == undefined){
            throw new Error("Mail adresi veya şifre hatalı.");
        }

        if(role != "Admin" && userFromDB.verified == false){
            let error2:any = new Error('Mail Adresi doğrulanmamış. Lütfen mail adresinizi doğrulayınız.');
            error2.status = 500;
            error2.verify = false;
            throw error2;
         }

        return {success: true, userFromDB: userFromDB, status: "success"};
    } catch (error:any) {   
        return {success: false, error: error, status: "error", verifyEmail: false};
    }

}

export default loginFunction;
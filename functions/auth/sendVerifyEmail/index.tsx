import { getDataByUnique, createNewData, deleteDataByMany } from "@/services/serviceOperations";
import getTurkeyTime from "@/functions/other/timeNow";
import EncryptPassword from "@/functions/auth/encryptPassword";

interface pageReturnPromise{
    status: string;
    mailKey: string | { error: any; };
    hashedEmail: string | { error: any; };
    mailCheck:{
        id: string;
        role: string;
        name: string;
        surname: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }
    date: string | Date | number;
    time: string | Date | number;
    error?:any
}

const SendVerifyEmail = async (email:string): Promise< pageReturnPromise | {error:any}> =>{

    try {
        if(!email) {
            throw new Error("Email adresi boş bırakılamaz!");
        }
    
        const date = (await getTurkeyTime()).date;
        const time = (await getTurkeyTime()).time;

        if(!process.env.MAIL_SECRET){
            throw new Error("Mail gönderilemedi! Lütfen daha sonra tekrar deneyiniz!");
        }
    
        const mailKey:string | { error: any } = await EncryptPassword(process.env.MAIL_SECRET); 
        const hashedEmail:string | { error: any } = await EncryptPassword(email);
    
        if(!mailKey || !hashedEmail) {
            throw new Error("Mail gönderilemedi! Lütfen daha sonra tekrar deneyiniz!");
        }


        const mailCheck = await getDataByUnique("AllUser", {email: email});
        if(!mailCheck || mailCheck == null || mailCheck.error){
            throw new Error("Girdiğiniz mail adresi geçersizdir!");
        }
       
        const verifyCheck = await getDataByUnique(mailCheck.role, {email: email});
        if(verifyCheck.error || !verifyCheck || verifyCheck == null){
            throw new Error("Girdiğiniz mail adresi geçersizdir!");
        }

        if(verifyCheck.verified){
            throw new Error("Girdiğiniz mail adresi zaten onaylanmış.");
        }
    
        const {error} = await deleteDataByMany("VerifyEmail", {email: email});
        if(error){
            throw new Error(error.message);
        }
    
        const createVerifyDB = await createNewData("VerifyEmail", {
            email: email,
            secretKey: mailKey,
            validTime: Date.now(),
          }); 
          
        if(createVerifyDB.error){
            throw new Error(createVerifyDB.error)
        }

        return {status: "success", mailKey, hashedEmail, mailCheck, date, time}
  
    } catch (error:any) {
        
        return {error: error.message }  
    }
}

export default SendVerifyEmail;
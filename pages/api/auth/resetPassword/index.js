import { updateDataByAny, getDataByUnique, deleteDataByMany } from "@/services/serviceOperations";
import EncryptPassword from "@/functions/auth/encryptPassword";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler (req, res) {
   
    //getServerSession:  Kullanıcının oturum açıp açmadığını kontrol eder. Eğer açılmışsa session değişkenine atar.
    const session = await getServerSession(req, res, authOptions)
        
    if(!session){
        if(req.method === 'POST'){
            const {password, passwordConfirm, email} = req.body;    
                         
            try {
                if(
                    password !== null || password == "" ||  password == undefined ||
                    passwordConfirm !== null || passwordConfirm == "" ||  passwordConfirm == undefined ||
                    password != passwordConfirm || passwordConfirm || password
                ){
                    throw new Error("Şifreler uyuşmuyor!");
                }
                const hashedNewPassword = await EncryptPassword(password);
                if(!hashedNewPassword){
                    throw new Error("Şifre oluşturulamadı!");
                }
                const allUserFromDB = await getDataByUnique("AllUser", {email: email});
                if(!allUserFromDB){
                    throw new Error("Kullanıcı bulunamadı!");
                }
                const role = await allUserFromDB.role;
                const userFromDB = await updateDataByAny(role, {email: email}, { verified: true, password: hashedNewPassword});
                if(!userFromDB){
                    throw new Error("Kullanıcı güncellenemedi!");
                }
                const deletforgotPasswordDB = await deleteDataByMany("ForgotPassword", {email: email});
                const deleteVerifyEmailDB = await deleteDataByMany("VerifyEmail", {email: email});

                return res.status(200).json({status: "success", message: "Şifre başarıyla değiştirildi!"});

                // Eğer kullanıcı gerekli alanları doldurmadan kayıt olmaya çalışırsa hata fırlatır.

            } catch (error) {
                return res.status(500).json({status: "error", error: error.message});       
            }      

        }
        else{
            return res.status(500).json({status: "error", error: "Şifre sıfırlama işleminde bir hata oluştu!"});
        }
    }
    else{
        return res.status(500).json({status: "error", error: "Şifre sıfırlama işleminde bir hata oluştu!"});
    }
}
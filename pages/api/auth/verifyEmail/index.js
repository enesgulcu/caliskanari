import VerifyEmail from "@/functions/auth/verifyEmail";
import { getServerSession } from "next-auth/next";

export default async function handler (req, res) {
    const session = await getServerSession(req, res, authOptions)
    if(!session){    
        const {key, email, role} = req.body;
        
        
        try {
            
            if(!email) {
                throw new Error("Lütfen Email Adresinizin Doğru Olduğundan Emin Olun.");
            }

            if(!key || !email || !role) {
                throw new Error("Mail Doğrulama Sırasında Bir Hata Oluştu. Lütfen Tekrar Deneyin.");
            }

            // Mailden gönderilen parametreleri fonksiyona gönderip kontrol ederiz.
            // Eğer kontrol edilen parametreler doğruysa kullanıcının email adresini onaylarız.
            const {error, status, message} = await VerifyEmail({key, email, role});
            if(error && status != "success"){
                throw new Error(error);
            }

            if(status == "success"){ 
                return res.status(200).json({status: "success",  message: message});
            }
            
        }
        catch (error) {
    
            return res.status(401).json({status: "error", error: error?.message, message: error?.message});
        }
    }
}


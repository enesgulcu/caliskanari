import { createStudent } from "@/functions/auth/register/student/index";
import EncryptPassword from "@/functions/auth/encryptPassword";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { transporter, mailOptions } from "@/pages/api/mail/nodemailer";

export default async function handler (req, res) {
    
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        if(req.method === 'POST'){
            try {
                const data = req.body;
                
                data.password = await EncryptPassword(data.password);
    
                const {error} = await createStudent(data);
                if(error) throw new Error(error);

                //mail gönderme işlemi
                await transporter.sendMail({
                    ...mailOptions,
                    subject: 'Kayıt işlemi başarılı subject',
                    text: 'Kayıt işlemi başarılı text',
                    html:"<h1 class='red'>Kayıt işlemi başarılı html</h1>"
                })
                
                return res.status(200).json({status: "success", message: "Kayıt işlemi başarılı"});
            } catch (error) {
                return res.status(500).json({status: "error", message: error.message}); 
           }                   
        } 
    }
    else{
        return res.status(401).json({status: "error", message: "Oturum açılmış kullanıcılar kayıt olamaz!"});
    }
};

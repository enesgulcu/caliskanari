import { createStudent } from "@/functions/auth/register/student/index";
import EncryptPassword from "@/functions/auth/encryptPassword";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { transporter, mailOptions } from "@/pages/api/mail/nodemailer";
import getTurkeyTime from "@/components/diger/timeNow";

export default async function handler (req, res) {

    const date = (await getTurkeyTime()).date;
    const time = (await getTurkeyTime()).time;
    
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        if(req.method === 'POST'){
            try {
                const data = req.body;
                
                data.password = await EncryptPassword(data.password);
    
                const {error} = await createStudent(data);
                if(error) throw new Error(error);

                //mail gönderme işlemi
                transporter.sendMail({
                    ...mailOptions,
                    subject: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Kayıt işlemi`,
                    text: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Kayıt işlemi`,
                    to: data.email,
                    createTime: {date, time},
                    html:`
                    <p>Sevgili</p>
                    <h5 class='color:red'>${data.name} ${data.surname}</h5>
                    <p>${data.email} mail adresinin Kayıt işlemi ${date} tarihinde, ${time} saatinde başarıyla yapıldı!</p>
                    <p>Kayıt edilen telefon: ${data.phone}</p>
                    `
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

import { createNewUser } from "@/functions/auth/register/usersRegister/index";
import EncryptPassword from "@/functions/auth/encryptPassword";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { transporter, mailOptions } from "@/pages/api/mail/nodemailer";
import getTurkeyTime from "@/functions/other/timeNow";

export default async function handler (req, res) {

    const date = (await getTurkeyTime()).date;
    const time = (await getTurkeyTime()).time;
    
    //getServerSession:  Kullanıcının oturum açıp açmadığını kontrol eder. Eğer açılmışsa session değişkenine atar.
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        if(req.method === 'POST'){
            try {
                const data = req.body;
                const mailKey = await EncryptPassword(process.env.MAIL_SECRET); 
                data.password = await EncryptPassword(data.password);
    
                const {error} = await createNewUser(data);
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
                    <h3 style='color:green'>${data.name} ${data.surname}</h3>
                    <p>${data.email} mail adresinin Kayıt işlemi ${date} tarihinde, ${time} saatinde başarıyla yapıldı!</p>
                    <p>Kayıt edilen telefon: ${data.phone}</p>
                    <a style="cursor: pointer" href = ${process.env.NEXT_PUBLIC_API_URL}/auth/verify/email?key=${mailKey}&time=${Date.now()}&mail=${data.email}&role=${data.role}>
                        <button style="
                        cursor: pointer;
                        background: #3d7bf1;
                        color: white;
                        padding: 15px;
                        border-radius: 10px;
                        border: white;
                        font-weight: 500;
                        
                        
                    ">
                            Hesabınızı Onaylamak İçin Tıklayın.
                        </button>
                    </a>
                    `
                })
                
                return res.status(200).json({status: "success", message: "Kayıt işlemi başarılı. Lütfen Mail adresinize gönderilen linke tıklayarak hesabınızı onaylayınız."});
            } catch (error) {
                return res.status(500).json({status: "error", message: error.message}); 
           }                   
        } 
    }
    else{
        return res.status(401).json({status: "error", message: "Oturum açılmış kullanıcılar kayıt olamaz!"});
    }
};

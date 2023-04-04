import EncryptPassword from "@/functions/auth/encryptPassword";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { transporter, mailOptions } from "@/pages/api/mail/nodemailer";
import getTurkeyTime from "@/functions/other/timeNow";
import {createNewForgotPassword} from "@/functions/auth/forgotPassword";

export default async function handler (req, res) {
    
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        const date = (await getTurkeyTime()).date;
        const time = (await getTurkeyTime()).time;
        
        //getServerSession:  Kullanıcının oturum açıp açmadığını kontrol eder. Eğer açılmışsa session değişkenine atar.
    
        if(req.method === 'POST'){
            try {
                const email = req.body;

                if(!email){
                    throw new Error("Email adresi boş bırakılamaz!");
                }

                const mailKey = await EncryptPassword(process.env.MAIL_SECRET);
                const hashedEmail = await EncryptPassword(email); 

                if(!mailKey || !hashedEmail || hashedEmail.error || mailKey.error){
                    throw new Error("Şifre sıfırlama işlemi sırasında bir hata oluştu!");
                }

                const NewPasswordData = await createNewForgotPassword(email,{mailKey});

                if(NewPasswordData.error || NewPasswordData == null || NewPasswordData == undefined){
                    throw new Error(NewPasswordData.error.message);
                }

                //mail gönderme işlemi
                transporter.sendMail({
                    ...mailOptions,
                    subject: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Şifre Sıfırlama İşlemi`,
                    text: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Şifre Sıfırlama İşlemi`,
                    to: email,
                    createTime: {date, time},
                    html:`
                    <p>Şifre Sıfırlama Bağlantısı</p>
                    <p>${email} mail adresinin şifre sıfırlama işlemi, ${date} tarihinde, ${time} saatinde gönderildi.</p>
                    <p>Şifre sıfırlama işlemini tamamlamak için aşağıdaki linke tıklayınız.</p>
                    <a style="cursor:pointer!important" href = ${process.env.NEXT_PUBLIC_URL}/auth/resetPassword?key=${mailKey}&email=${hashedEmail}>
                        <button style="
                        cursor: pointer!important;
                        background: #3d7bf1;
                        color: white;
                        padding: 15px;
                        border-radius: 10px;
                        border: white;
                        font-weight: 500;
                    ">
                            Şifre Sıfırlama Bağlantısı
                        </button>
                    </a>
                    </hr>
                    <p>Eğer bu işlemi siz yapmadıysanız bizimle iletişime geçebilirsiniz ${process.env.NEXT_PUBLIC_COMPANY_NAME}</p>
                    `
                })
                
                return res.status(200).json({status: "success", message: "Şifre sıfırlama bağlantısı mail adresinize gönderildi."});
            } catch (error) {
                return res.status(500).json({status: "error", message: error.message}); 
           }                   
        } 
    }
    else{
        return res.status(401).json({status: "error", message: "Oturum açılmış kullanıcılar şifre sıfırlama işlemi yapamaz."});
    }
};

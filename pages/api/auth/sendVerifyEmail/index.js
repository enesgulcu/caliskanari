import { transporter, mailOptions } from "@/pages/api/mail/nodemailer";
import SendVerifyEmail from "@/functions/auth/sendVerifyEmail";
import { getServerSession } from "next-auth/next";

export default async function handler (req, res) {
    
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        
        const {email} = req.body;
        
        
        try {
            
            if(!email) {
                throw new Error("Lütfen email adresini doğru girin.");
            }

            const {error, status, mailKey, hashedEmail, mailCheck, date, time} = await SendVerifyEmail(email);


            if(error){
                throw new Error(error);
            }

            if(status == "success"){
                transporter.sendMail({
                    ...mailOptions,
                    subject: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Mail Onaylama Bağlantısı`,
                    text: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Mail Onaylama Bağlantısı`,
                    to: email,
                    createTime: {date, time},
                    html:`
                        <p>Sevgili</p>
                        <h3 style='color:green'>${mailCheck.name} ${mailCheck.surname}</h3>
                        <p>${email} mail adresinin Onaylama işlemi ${date} tarihinde, ${time} saatinde oluşturuldu.</p>
                        <a
                            style="cursor:pointer!important"
                            href = ${process.env.NEXT_PUBLIC_URL}/auth/verifyEmail?key=${mailKey}&time=${Date.now()}&email=${hashedEmail}&role=${mailCheck.role}>
                            
                            <button style="
                                cursor: pointer!important;
                                background: #3d7bf1;
                                color: white;
                                padding: 15px;
                                border-radius: 10px;
                                border: white;
                                font-weight: 500;
                            ">
                                Mail Hesabınızı Onaylamak İçin Tıklayın.
                            </button>
                        </a>
                    `
            })
                
                return res.status(200).json({status: "success",  message: "Mail adresinize onaylama bağlantısı gönderildi."});
            }

            
            
        }
        catch (error) {
    
            return res.status(401).json({status: "error", error: error?.message, message: error?.message});
        }
    }
}

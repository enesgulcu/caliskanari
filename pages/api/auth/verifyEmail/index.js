import VerifyEmail from "@/functions/auth/verifyEmail";
import { getDataByUnique, createNewData, deleteDataByMany } from "@/services/serviceOperations";
import { transporter, mailOptions } from "@/pages/api/mail/nodemailer";
import getTurkeyTime from "@/functions/other/timeNow";
import EncryptPassword from "@/functions/auth/encryptPassword";

export default async function handler (req, res) {
        
    const {email, key, time, role} = req.body;
    
    
    try {
        
        if(!email) {
            throw new Error("Girdiğiniz bilgiler geçersizdir.");
        }

        // mail doğrulama formu ile bağlantı göndermek isterse burası çalışır.
        if(email && !key || !time || !role) {

            const mailKey = await EncryptPassword(process.env.MAIL_SECRET); 
            const hashedEmail = await EncryptPassword(email);
            const mailCheck = await getDataByUnique("AllUser", {email: email});
            const date = (await getTurkeyTime()).date;
            const time = (await getTurkeyTime()).time;

            
            if(!mailCheck){
                throw new Error("Girdiğiniz mail adresi geçersizdir!");
            }

            const {error} = await deleteDataByMany("VerifyEmail", {email: email});
            if(error) throw new Error(error);

            const createVerifyDB = await createNewData("VerifyEmail", {
                email: email,
                secretKey: mailKey,
                validTime: Date.now(),
              }); 

            if(createVerifyDB.error) throw new Error(createVerifyDB.error);

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
                <a style="cursor:pointer!important" href = ${process.env.NEXT_PUBLIC_URL}/auth/verifyEmail?key=${mailKey}&time=${Date.now()}&email=${hashedEmail}&role=${mailCheck.role}>
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

        // mailden bağlantıya tıklarsa burası çalışır.
        else if( email || key || time || role){
            const  {error}  = await VerifyEmail({email, key, time, role});
            if(error) throw new Error(error);

            return res.status(200).json({status: "success", message: "Mail adresiniz başarıyla onaylandı!"});
        }
        
    }
    catch (error) {
  
        return res.status(401).json({status: "error", error: error?.message, message: error?.message});
    }
}


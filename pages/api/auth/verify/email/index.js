import DecryptPassword from "@/functions/auth/decryptPassword";
import VerifyEmail from "@/services/email/verify";
export default async function handler (req, res) {
    try {
        const query = req.query;
    
    const secret = await DecryptPassword(process.env.MAIL_SECRET, query.key);
   
    if(secret && query.mail && query.time && query.role){
        const time = parseInt(query.time);
        const now = Date.now();
        const LifeTime = now - time;


        //const pastDay = Math.floor(LifeTime / (1000 * 60 * 60 * 24));
        const pastHour = Math.floor((LifeTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const pastMinute = Math.floor((LifeTime % (1000 * 60 * 60)) / (1000 * 60));
        //const pastSecond = Math.floor((LifeTime % (1000 * 60)) / 1000);


        if(pastHour < 24){
            const  {error}  = await VerifyEmail(query.mail, query.role);
            console.log(error);
            if(error) throw new Error(error);
            return res.status(200).json({status: "success", message: "Mail adresiniz başarıyla onaylandı!", pastMinute});
        }

         else{
             return res.status(401).json({status: "error", message: "Mail adresinizin onay süresi doldu!", pastMinute});
        }
    }
    else{
        return res.status(401).json({status: "error", message: "Mail adresiniz onaylanamadı!"});
    }
    } catch (error) {
        res = res.status(401).json({status: "error", message: error.message});
    }
}
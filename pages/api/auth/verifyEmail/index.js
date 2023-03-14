import DecryptPassword from "@/functions/auth/decryptPassword";
import VerifyEmail from "@/functions/email/verify";
export default async function handler (req, res) {
    try {
        const body = req.body;
    
    const secret = await DecryptPassword(process.env.MAIL_SECRET, body.key);
   
    if(secret && body.mail && body.time && body.role){
        const time = parseInt(body.time);
        const now = Date.now();
        const LifeTime = now - time;


        //const pastDay = Math.floor(LifeTime / (1000 * 60 * 60 * 24));
        //const pastMinute = Math.floor((LifeTime % (1000 * 60 * 60)) / (1000 * 60));
        //const pastSecond = Math.floor((LifeTime % (1000 * 60)) / 1000);

        const pastHour = Math.floor((LifeTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));


        if(pastHour < 24){
            const  {error}  = await VerifyEmail(body.mail, body.role);

            if(error) throw new Error(error?.message);
            
            return res.status(200).json({status: "success", message: "Mail adresiniz başarıyla onaylandı!"});
        }

         else{
             return res.status(401).json({status: "error", message: "Mail adresinizin onay süresi doldu!"});
        }
    }
    else{
        return res.status(401).json({status: "error", message: "Mail adresiniz onaylanamadı!"});
    }
    } catch (error) {
        return res.status(401).json({status: "error", message: error?.message});
    }
}


import DecryptPassword from "@/functions/auth/decryptPassword";
export default async function handler (req, res) {
    const query = req.query;

    const secret = await DecryptPassword(process.env.MAIL_SECRET, query.key);
   
    if(secret && query.mail && query.time && query.role){
        const time = parseInt(query.time);
        const now = Date.now();
        const diff = now - time;

        // dakika cinsinden geçen süre
        const pastTime = diff / 1000 / 60;
        const  endTime = 24 * 60;
        const LifeTime = (endTime - pastTime) / 60;

        if(diff < 600000){
            const { error } = await verifyEmail(query.mail, query.role);
            if(error) throw new Error(error);
            return res.status(200).json({status: "success", message: "Mail adresiniz başarıyla onaylandı!", time:LifeTime});
        }
        else{
            return res.status(401).json({status: "error", message: "Mail adresinizin onay süresi doldu!", time:LifeTime});
        }
    }
    else{
        return res.status(401).json({status: "error", message: "Mail adresiniz onaylanamadı!"});
    }
}
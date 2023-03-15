import VerifyEmail from "@/functions/auth/verifyEmail";

export default async function handler (req, res) {
    try {
        const searchParams = req.body;

        if( !searchParams.key || !searchParams.email || !searchParams.time || !searchParams.role) {
            throw new Error("Girdiğiniz bilgiler geçersizdir.");
        }

        const  {error}  = await VerifyEmail(searchParams);
        if(error) throw new Error(error);
            
        return res.status(200).json({status: "success", message: "Mail adresiniz başarıyla onaylandı!"});
        
    }
    catch (error) {
        return res.status(401).json({status: "error", error: error?.message, message: "Mail Onaylama sırasında bir hata ile karşılaşıldı!"});
    }
}


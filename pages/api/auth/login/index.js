import loginFunction from "@/functions/auth/login/index";


export default async function handler (req, res) {
   
    if(req.method === 'POST'){

        try {
            const data = req.body;

            if(!data.email || !data.password){
                throw new Error("Lütfen tüm alanları doldurunuz.");
            }
            
            // kullanıcı verilerini sorgula / şifreleri karşılaştır.
            const {userFromDB, error} = await loginFunction(data);
            
            if(error){
                
                throw new Error(error.message);
            }
        
            return res.status(200).json({success: true,verifyEmail: userFromDB.verified , userFromDB: userFromDB, message: "Giriş işlemi başarılı"});

        } catch (error) {   
            return res.status(500).json({status: "error", error: error.message, verifyEmail: error.verifyEmail}); 
       }                   
    }   

    };

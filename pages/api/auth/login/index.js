import loginFunction from "@/functions/auth/login/index";


export default async function handler (req, res) {
   
    if(req.method === 'POST'){
        try {
            const data = req.body;
            
            // kullanıcı verilerini sorgula / şifreleri karşılaştır.
            const {userFromDB, error} = await loginFunction(data);
            
            if(error){
                throw new Error(error);
            }
            
            return res.status(200).json({success: true, userFromDB: userFromDB, message: "Giriş işlemi başarılı"});

        } catch (error) {
            return res.status(500).json({status: "error", error: error.message}); 
       }                   
    }   

    };

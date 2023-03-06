import GetAdmin from "@/functions/auth/login/admin/index";


export default async function handler (req, res) {

    if(req.method === 'POST'){
        try {
            const data = req.body;
            
            // kullanıcı verilerini sorgula / şifreleri karşılaştır.
            const {admin} = await GetAdmin(data);
            
            if(!admin) throw new Error("Kullanıcı adı veya şifre hatalı");
            
            return res.status(200).json({admin, message: "Giriş işlemi başarılı"});

        } catch (error) {
            return res.status(500).json({status: "error", message: error.message}); 
       }                   
    }   

    };

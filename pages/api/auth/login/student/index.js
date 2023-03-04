import GetStudent from "@/functions/auth/login/student/index";


export default async function handler (req, res) {

    if(req.method === 'POST'){
        try {
            const data = req.body;
            
            // kullanıcı verilerini sorgula / şifreleri karşılaştır.
            const {student} = await GetStudent(data);
            if(!student) throw new Error("Kullanıcı adı veya şifre hatalı");
            
            return res.status(200).json({student, message: "Giriş işlemi başarılı"});
        } catch (error) {
            return res.status(500).json({status: "error", message: error.message}); 
       }                   
    }   

    };

import { createStudent } from "@/functions/auth/register/student/index";
import bcryptPassword from "@/functions/auth/register/bcryptPassword";

export default async function handler (req, res) {
    if(req.method === 'POST'){
        try {
            const data = req.body;
            data.password = await bcryptPassword(data.password);

            const {error} = await createStudent(data);
            if(error) throw new Error(error);
            
            return res.status(200).json({status: "success", message: "Kayıt işlemi başarılı"});
        } catch (error) {
            return res.status(500).json({status: "error", message: error.message}); 
       }                   
    }   

    };

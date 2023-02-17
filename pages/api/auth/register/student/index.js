import { createStudent } from "@/functions/auth/register/student/index";

export default async function handler  (req, res) {
    if(req.method === 'POST'){
        try {
            const data = req.body;
            const { student, error } = await createStudent(data);
            if(error) throw new Error(error);
            return res.status(200).json({student});
        } catch (error) {
            return res.status(500).json({error: error.message}); 
       }                    
    }   

    };

// services > student > CRUD içindeki index.js fonksiyonlarını kullanıyoruz.
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "@/services/student/CRUD/index";

export default async function handler(req, res) {

    // GET
    if(req.method === 'GET'){
        try {
            // GET Student by ID
            if(req.query.id){ const { id } = req.query;
                const { student, error } = await getStudentById(id);
                if(error) throw new Error(error);
                return res.status(200).json({student});
            }
            // GET ALL Students
            else{ const { students, error } = await getStudents();
                if(error) throw new Error(error);
                return res.status(200).json({students});
            }
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
    
    // POST
    if(req.method === 'POST'){
        try {
            const data = req.body;
            const { student, error } = await createStudent(data);
            if(error) throw new Error(error);
            return res.status(200).json({student});
        }catch (error) { 
            return res.status(500).json({error: error.message}); 
        } 
    }
}





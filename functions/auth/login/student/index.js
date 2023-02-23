// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import prisma from "@/lib/prisma/index";
import DecryptPassword from "../../decryptPassword";

// POST
export default async function GetStudent(loginStudent) {

    try {
        const loginCheck = await prisma.student.findUnique({
            where: {
                email: loginStudent.email
            },
        })
        if(!loginCheck) throw new Error("Bu mail adresi ile kayıtlı bir öğrenci bulunamadı.");
    
        const passwordCheck = await DecryptPassword(loginStudent.password, loginCheck.password);
        if(!passwordCheck) throw new Error("Şifre hatalı.");
    
        return { student: loginCheck };
    } catch (error) {
         throw new Error(error.message);
    }

}
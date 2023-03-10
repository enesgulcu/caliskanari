import prisma from "@/lib/prisma/index";
export default async function VerifyEmail(mail, role) {
    try {
        let mailCheck = "";
        // Veritabanından öğrenci ile eşleşen bir kayıt var mı kontrol et

        if(role == "student"){
            const verifyCheck = await prisma.studentVerify.findUnique({
                where: {
                email: mail
                },
            })
            if(!verifyCheck){
                mailCheck = await prisma.student.findUnique({
                    where: {
                    email: mail
                    },
                })
            }
            else{
                throw new Error("Mail adresiniz zaten onaylanmış.")
            }
        }
        
        else if(role == "teacher"){
            const verifyCheck = await prisma.teacherVerify.findUnique({
                where: {
                email: mail
                },
            })
            if(!verifyCheck){
                mailCheck = await prisma.teacher.findUnique({
                    where: {
                    email: mail
                    },
                })
            }
            else{
                throw new Error("Mail adresiniz zaten onaylanmış.")
            }
        }
        
         // Eğer öğrenci ile eşleşen bir kayıt varsa hata döndür
         if (mailCheck == null || mailCheck.email != mail) {
          throw new Error("Mail adresiniz onaylanamadı!");
        }
   
  
        else{
            mailCheck.verified = true;
          // studentVerify tablosuna yeni kayıt ekle ve student tablosundan kaydı sil
          const studentFromDB = await prisma.studentVerify.create({ data: mailCheck });
          
          const student = await prisma.Student.delete({ where:{email : mailCheck.email} });

            if(!student || !studentFromDB){
                throw new Error("Mail adresiniz onaylanamadı bir hata ile karşılaşıldı!")
            }
            
            else{
                return { studentverify: studentFromDB , student};
            }
            
        }            
      } catch (error) {
        return { error };
      }
}

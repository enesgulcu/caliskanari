import prisma from "@/lib/prisma/index";
export default async function VerifyEmail(mail, role) {
    try {
        const verifyCheck = role === "student" ?
        await prisma.studentVerify.findUnique({ where: { email: mail } }) :
        await prisma.teacherVerify.findUnique({ where: { email: mail } });

        if (verifyCheck) {
        throw new Error("Mail adresiniz zaten onaylanmış.");
        }

        mailCheck = role === "student" ?
        await prisma.student.findUnique({ where: { email: mail } }) :
        await prisma.teacher.findUnique({ where: { email: mail } });

        if (!mailCheck || mailCheck.email !== mail) {
        throw new Error("Mail adresiniz onaylanamadı!");
        }

        mailCheck.verified = true;

        const studentFromDB = await prisma.studentVerify.create({ data: mailCheck });
        const student = await prisma.Student.delete({ where: { email: mailCheck.email } });

        if (!student || !studentFromDB) {
        throw new Error("Mail adresiniz onaylanamadı bir hata ile karşılaşıldı!");
        }

        return { studentverify: studentFromDB, student };
                        
      } catch (error) {
        return { error };
      }
}

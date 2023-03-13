import prisma from "@/lib/prisma/index";

export default async function VerifyEmail(mail, role) {
  try {
    const verifyCheck = await prisma[`${role}Verify`].findUnique({
      where: { email: mail },
    });

    if (verifyCheck) {
      throw new Error("Mail adresiniz zaten onaylanmış.");
    }

    const mailCheck = await prisma[role].findUnique({ where: { email: mail } });

    if (!mailCheck || mailCheck.email !== mail) {
      throw new Error("Kullanıcı kaydı bulunamadı.");
    }

    mailCheck.verified = true;

    const user = await prisma[role].delete({ where: { email: mailCheck.email } });
    const userFromDB = await prisma[`${role}Verify`].create({ data: mailCheck });

    if (!user || !userFromDB) {
      throw new Error("Mail adresiniz onaylanamadı bir hata ile karşılaşıldı!");
    }

    return { [`${role}verify`]: userFromDB, [role]: user };
  } catch (error) {
    return { error };
  }
}
import prisma from "@/lib/prisma/index";
import { getUserByEmail, updateUserByEmail} from "@/services/usersAllProcess/index";

export default async function VerifyEmail(mail, role) {
  try {

    let mailCheck = await getUserByEmail(role, mail);
    mailCheck = mailCheck.user;


    if (!mailCheck) {
      throw new Error("Kullanıcı kaydı bulunamadı.");
    }

    if (mailCheck.verified){ 
      throw new Error("Mail adresiniz zaten onaylanmış.");
    }

    mailCheck.verified = true;

    const userFromDB = await updateUserByEmail(role, mail, mailCheck.verified);
    console.log(userFromDB);
    if (!userFromDB) {
      throw new Error("Mail adresiniz onaylanamadı bir hata ile karşılaşıldı!");
    }

    return { message: "Mail adresiniz başarıyla onaylandı!"};
  } catch (error) {
    return  {error} ;
  }
}
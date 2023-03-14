import { getDataByUnique, updateDataByAny} from "@/services/serviceOperations";

export default async function VerifyEmail(email, role) {
  try {

    const mailCheck = await getDataByUnique(role, {email: email});


    if (!mailCheck || mailCheck.role !== role) {
      throw new Error("Kullanıcı kaydı bulunamadı.");
    }

    if (mailCheck.verified){ 
      throw new Error("Mail adresiniz zaten onaylanmış.");
    }


    const userFromDB = await updateDataByAny(role, {email: email}, { verified: true});
    if (!userFromDB) {
      throw new Error("Mail adresiniz onaylanamadı bir hata ile karşılaşıldı!");
    }

    return { message: "Mail adresiniz başarıyla onaylandı!"};
  } catch (error) {
    return  {error} ;
  }
}
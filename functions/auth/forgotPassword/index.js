import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/services/usersAllProcess";
// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import { createForgotPassword } from "@/services/auth/forgotPassword";  
import DecryptPassword from "../decryptPassword";  

export async function createNewForgotPassword(data, {email, mailKey}) {

  try {
    
    // kullanıcı kontrolü
    let mailCheck = await getUserByEmail("allUser", data);

    mailCheck = mailCheck.user;
    

    // eğer doğrulanmamış bir hesaba bağlı bir kayıt varsa yen iveriyi üzerine yaz
    if (mailCheck == null) {
      throw new Error("Bu email adresine kayıtlı bir kullanıcı bulunamadı!");
    }


    else {
      const forgotPasswordFromDB = await prisma.ForgetPassword.create({ data: {email:email, secretKey:mailKey} });
      return { data: forgotPasswordFromDB };
    }          
  } 
  catch (error) {
    return { error };
  }
}
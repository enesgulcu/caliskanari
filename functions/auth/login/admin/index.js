// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import prisma from "@/lib/prisma/index";
import DecryptPassword from "@/functions/auth/decryptPassword";



// POST
export default async function GetAdmin(loginAdmin) {

    // const aaa = await EncryptPassword("Ts1967Gs1905@")
    // console.log(aaa);

    try {
        const loginCheck = await prisma.admin.findUnique({
            where: {
                email: loginAdmin.email
            },
        })
        if(!loginCheck) throw new Error("Bu mail adresi ile kayıtlı bir Admin bulunamadı.");

        const myPassword = loginCheck.password + process.env.ADMIN_PASSWORD;
        
        const passwordCheck = await DecryptPassword(loginAdmin.password, myPassword);

        if(!passwordCheck) throw new Error("Şifre hatalı.");

        return {
            admin:{
                ok : true,
                message: "Admin girişi başarılı",
                "name":loginCheck.name,
                "surname":loginCheck.surname,
                "role":loginCheck.role
            }
        }

    } catch (error) {
         throw new Error(error.message);
    }

}
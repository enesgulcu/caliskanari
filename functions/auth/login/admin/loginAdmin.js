const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = process.env.ADMIN_NAME;
const adminSurname = process.env.ADMIN_SURNAME;
const adminId = process.env.ADMIN_ID;
const adminRole = process.env.ADMIN_ROLE;

// ENESE NOT: .env içine kaydedilen şifreyi "bcrypt" ile şifrele sonra 
//burada her giriş işleminde decode ederek kontrol et... 

export default async function loginAdmin({email, password}) {

  if(email == adminEmail && password == adminPassword){
    
    return {
            ok : true,
            message: "Admin girişi başarılı",
            "id":adminId,
            "name":adminName,
            "surname":adminSurname,
            "role":adminRole
            }
    }
    else{
        return {
            ok: false,
            message: "Admin girişi başarısız."
        }
    }
}


import bcrypt from 'bcryptjs'; 

export default async function EncryptPassword(password) {
    try {
        if(!password) throw new Error("Error: Password is empty");
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;

    } catch (error) {
        console.log(error);      
    }
}

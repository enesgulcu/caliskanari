import bcrypt from 'bcryptjs'; 

export default async function DecryptPassword(LoginPassword, databasePassword) {
    try {
        
        if(!LoginPassword || !databasePassword) {
            throw new Error("Password is empty");
        }

        return bcrypt.compareSync(LoginPassword, databasePassword, (err, result) => {

            if(err) throw new Error(err);
            return result;
            
        });
 
    } catch (error) {
        return {error: error};    
    }
}


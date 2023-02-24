import bcrypt from 'bcryptjs'; 

export default async function DecryptPassword(LoginPassword, databasePassword) {
   
    try {
        
        return bcrypt.compareSync(LoginPassword, databasePassword, (err, result) => {

            if(err) throw new Error(err);
            return result;
            
        });
 
    } catch (error) {
        console.log(error);      
    }
}


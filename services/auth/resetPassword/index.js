export default async function ResetPassword(values){
    
   const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`,{
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(values)
       
   }).then(res => res.json())
   .catch(err => console.log(err))

   return data;
}
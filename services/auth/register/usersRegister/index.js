// Öğrenci (kayıt) işlemleri için kullanılan servis
export async function createUser(newUser){

    const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/auth/register/usersRegister`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
        
    }).then(res => res.json())
    .catch(err => console.log(err))

    return data;
}
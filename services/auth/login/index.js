// Öğrenci (Login) işlemleri için kullanılan servis
export async function loginStudent(loginStudent){

    const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/auth/login/student`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginStudent)
        
    }).then(res => res.json())
    .catch(err => console.log(err))

    return data;
}
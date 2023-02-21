// Öğrenci (kayıt) işlemleri için kullanılan servis
export async function createStudent(newStudent){

    const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/auth/register/student`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
        
    }).then(res => res.json())
    .catch(err => console.log(err))

    return data;
}
// Öğrenci kayıt işlemleri için kullanılan servis
export async function createStudent(newStudent){

    const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/auth/register/student`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
        
    }).then(res => res.json())

    return data;
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch(err => console.log(err))

}
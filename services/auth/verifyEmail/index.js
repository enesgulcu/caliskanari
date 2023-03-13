// Öğrenci (kayıt) işlemleri için kullanılan servis
export async function VerifyEmail({searchParams}){
    
    const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/auth/verifyEmail`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchParams)
        
    }).then(res => res.json())
    .catch(err => console.log(err))

    return data;
}
// Öğrenci (kayıt) işlemleri için kullanılan servis
export async function getAPI(URL, headers = {'Content-Type': 'application/json'}){

    const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL + URL}`,{
        method: "GET",
        headers:headers

    }).then(res => res.json())
    .catch(err => console.log(err))

    return data;
}


// Öğrenci (kayıt) işlemleri için kullanılan servis
export async function postAPI(URL, body = "", method="POST", headers = {'Content-Type': 'application/json'}){
    

    const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL + URL}`,{
        method: method,
        headers: headers,
        body: JSON.stringify(body)
        
    }).then(res => res.json())
    .catch(err => console.log(err))

    return data;
}




// Öğrenci (kayıt) işlemleri için kullanılan servis
export async function postAPI(URL, body = "", method="POST", headers = {'Content-Type': 'application/json'}){


    try {
        const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL + URL}`,{
            method: method,
            headers: headers,
            body: JSON.stringify(body)
            
        }).then(res =>{
            if(res.url.includes("/notification") && res.redirected){
                return window.location.href = res.url;
            }
            else{
                return res.json();
            }
            
        }).catch(err => console.log(err))
        
        return data;

    } catch (err) {
        throw new Error(`API request failed: ${err}`);
    }        
}

// Öğrenci (kayıt) işlemleri için kullanılan servis
export async function getAPI(URL, headers = {'Content-Type': 'application/json'}){



    const data = await fetch (`${process.env.NEXT_PUBLIC_API_URL + URL}`,{
        method: "GET",
        headers:headers

    }).then(res =>{
        if(res.redirected){
            
            // bazı yerlerde window'u bulamıyor kontrol et
            //return window.location.href = res.url;
        }
        else{
            return res.json();
        }
        
    }).catch(err => console.log(err))

    return data;
}




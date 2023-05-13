import { NextResponse } from 'next/server';

// Bu fonksiyonun amacı cookie içerisinden gelen zamanı kontrol etmek 
// zaman yok ise yeni bir zaman dilimini cookie içerisine aktarmaktır.
// cookie içerisinde belirlenen aralıklarla güncel zamanı sürekli bulundurmayı sağlar.

const CookieTimeUpdate = async (req:any, pathname:string, updateLoop:number):Promise<any> => {

    if(req){      
        const { cookies } = req
        const responseCookies = NextResponse.next();

        // cookie içerisinde "lastUpdateTime" VARSA! burası çalışır...
        if(cookies.get('lastUpdateTime')){

            // cookie içerisindeki json değerini JSON.parse() ile objeye çevirerek  kullanabilirsiniz.
            const lastUpdateTime = JSON.parse(cookies.get('lastUpdateTime').value).Date
            const currentTime = new Date().getTime().toString()
            const timeDifference = parseInt(currentTime) - parseInt(lastUpdateTime)

            // 1000 milisaniye = 1 saniye
            // 1000 * 60 milisaniye = 1 dakika

            // Burası 30 dakikadan fazla zaman geçmişse çalışır...
            // updateLoop -> 30 dakika
            if(timeDifference > 1000 * 60 * updateLoop){
                console.log("büyük : " + timeDifference)
                //responseCookies.cookies.delete("lastUpdateTime");
                 responseCookies.cookies.set(
                    {
                        name: 'lastUpdateTime',
                        value:JSON.stringify({
                            Date: new Date().getTime().toString(),
                            Time: new Date().toLocaleTimeString()
                        }),
                        httpOnly : true, // true by default
                        maxAge: 60 * 60 * 12, // 12 HOUR
                        path: '/', // root of the domain                    
                    }                 
                )
                return responseCookies;    
            }
        }
        
        //#######################################################################################

        // cookie içerisinde "lastUpdateTime" YOKSA! burası çalışır...
        else{
            responseCookies.cookies.set(
                {
                    name: 'lastUpdateTime',
                    value:JSON.stringify({
                        Date: new Date().getTime().toString(),
                        Time: new Date().toLocaleTimeString()
                    }),
                    httpOnly : true, // true by default
                    maxAge: 60 * 60 * 12, // 12 HOUR
                    path: '/', // root of the domain                    
                }                 
            )
            return responseCookies;
        }
    }
}

export default CookieTimeUpdate

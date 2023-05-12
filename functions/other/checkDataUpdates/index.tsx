import { NextResponse } from 'next/server';

// Bu fonksiyonun amacı cookie içerisinden gelen zamanı kontrol etmek 
// ve belirlenen süreyi geçmişse tetiklenerek çalışmasıdır.

const CheckDataUpdates = async (req:any, pathname:string):Promise<any> => {
    const { cookies } = req
    const responseCookies = NextResponse.next();
    
    if(req){  
        console.log(cookies);     
        // cookie içerisinde "lastUpdateTime" VARSA! burası çalışır...
        if(cookies.get('lastUpdateTime')){
            const lastUpdateTime = cookies.get('lastUpdateTime')
            const currentTime = new Date().getTime().toString()
            const timeDifference = parseInt(currentTime) - parseInt(lastUpdateTime)
            // 1000 milisaniye = 1 saniye
            // 1000 * 60 milisaniye = 1 dakika
            // 1000 * 60 * 10 milisaniye = 10 dakika
            // Burası 10 dakikadan fazla zaman geçmişse çalışır...
            
            if(timeDifference > 1000 * 60 * 10){
                 responseCookies.cookies.set(
                    {
                        name: 'lastUpdateTime',
                        value:JSON.stringify({
                            Date: new Date().getTime().toString(),
                            Time: new Date().toLocaleTimeString()
                        }),
                        httpOnly : true, // true by default
                        maxAge: 60 * 60 * 24, // 1 day
                        path: '/', // root of the domain                    
                    }                 
                )
                return responseCookies;    
            }
        }

        //#######################################################################################
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
                    maxAge: 60 * 60 * 24, // 1 day
                    path: '/', // root of the domain                    
                }                 
            )
            return responseCookies;
        }
    }
}

export default CheckDataUpdates

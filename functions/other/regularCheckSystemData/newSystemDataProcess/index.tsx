'use server';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getAllData } from "@/services/serviceOperations";
import { cookies } from 'next/headers';

// Bu fonksiyon sadece " GET " isteği yapan componentlerde kullanılacak.
// Bu fonksiyon ile veri tabanından, cookie'den veya localstorage'dan veri çekme işlemleri yapılır.
// İlk olarak cookie veya localstorage'dan veri çekmeyi dener. Eğer veri çekilemezse veri tabanından çekmeye çalışır.
// Eğer veri tabanından da veri çekilemezse hata döndürür.
// Eğer veri tabanından veri çekilebilirse, cookie veya localstorage içine veri kaydı yapılır çünkü: bir sonraki istekte yeniden çekmesin diye.
const NewSystemDataProcess = async (
    req:NextApiRequest, 
    componentName: string, // veri alışverişini yapan componentin adı (veritabanı ile aynı isimle olması önemli)
    storageType: "localStorage" | "cookie" | "database"  = "database",
    sendStorageLocation:"localStorage" | "cookie" = "localStorage",
    
    ):Promise<any> => {
  
    try {
//1.0 #### GEREKLİ KONTROLLER ####################################################################################
        if((!req || !componentName) || (req == undefined || componentName == undefined)){
            throw new Error("error788");
            
        }

//2.1 #### VERİTABANI KONTROLÜ VE İŞLEMLERİ ######################################################################
        if(storageType == "database" && componentName){

            // veri tabanından veriyi çekme, cookie ve localstorage temizleme ve return etme işlemi uygulanacak.
            const data = await getAllData(componentName);
            
            if(!data || data.error || data === undefined || data.length === 0){
                throw new Error("error789");
            }

            const responseCookies = NextResponse.next();

            // veri tabanından çekilen verileri cookie veya localstorage'a kaydediyoruz.
            if(sendStorageLocation == "localStorage"){
                localStorage.removeItem(componentName);
                localStorage.setItem(componentName, JSON.stringify(data));          
            }

            // veri tabanından çekilen verileri cookie veya localstorage'a kaydediyoruz.
            if(sendStorageLocation == "cookie"){
                responseCookies.cookies.delete(componentName);
                responseCookies.cookies.set(componentName, JSON.stringify(data));
            }                 

            // veri tabanından gelen veriyi kullanıcıya döndürürüz.
            return {error: null, data: data, status: "success", storageType: storageType};
        }
        
//2.2 #### COOKIE KONTROLÜ VE İŞLEMLERİ ##########################################################################
        else if(storageType == "cookie" && componentName){

            const responseCookies = NextResponse.next();
            
            if(!responseCookies){
                throw new Error("error789");
            }

            // cookie'den veri çekme işlemi
            const checkCookie = responseCookies.cookies.get(componentName);

            if(!checkCookie || checkCookie == undefined || checkCookie == null){

                const data = await getAllData(componentName);
                
                if(!data[0] || data[0].error || data[0] === undefined || data[0].length === 0){
                    throw new Error("error789");
                }
                if(sendStorageLocation == "cookie"){
                    
                    // UYARI ! : cookie ve localstorage ekleme işlemleri yapılamadı kontrol et!!
                    responseCookies.cookies.delete(componentName);
                    responseCookies.cookies.set(componentName, JSON.stringify(data[0]));
                    
                }
                else if(sendStorageLocation == "localStorage"){

                    // UYARI ! : cookie ve localstorage ekleme işlemleri yapılamadı kontrol et!!
                    localStorage.removeItem(componentName);
                    localStorage.setItem(componentName, JSON.stringify(data[0]));
                    
                }
                else{
                    throw new Error("error790");
                }
               
                return {error: null, data: data, status: "success", storageType: storageType};

            }

            // veri cookie'den gelmişse kullanıcıya döndürürüz.
            return {error: null, data: checkCookie, status: "success", storageType: storageType};
        }
        
//2.3 #### LOCALSTORAGE KONTROLÜ VE İŞLEMLERİ ####################################################################
        else if(storageType == "localStorage" && localStorage && componentName){
            
            const responseCookies = NextResponse.next();
            // localstorage'dan veri çekme işlemi
            const checkLocalStor = localStorage.getItem(componentName);

            if(!checkLocalStor || checkLocalStor == undefined || checkLocalStor == null){
                
                const data = await getAllData(componentName);
                console.log(data);
                if(!data || data.error || data === undefined || data.length === 0){
                    
                    throw new Error("error789");
                }

                if(sendStorageLocation == "cookie"){

                    // UYARI ! : cookie ve localstorage ekleme işlemleri yapılamadı kontrol et!!
                    responseCookies.cookies.delete(componentName);
                    responseCookies.cookies.set(componentName, JSON.stringify(data[0]));

                }
                else if(sendStorageLocation == "localStorage"){
                    
                    // UYARI ! : cookie ve localstorage ekleme işlemleri yapılamadı kontrol et!!
                    localStorage.removeItem(componentName);
                    localStorage.setItem(componentName, JSON.stringify(data[0]));
                }
                else{
                    
                    throw new Error("error791");
                }

                return {error: null, data: data, status: "success", storageType: storageType};
            }

            // veri Localstorage'dan gelmişse kullanıcıya döndürürüz.
            return {error: null, data: checkLocalStor, status: "success", storageType: storageType};
        }
        
//3.0 #### HATA KONTROLÜ ########################################################################################

        else{
            console.log("yyyyyyyyyyyyy");
            throw new Error("error792");
        }

    } catch (error) {
        return {error: error, data: null, status: "error", storageType: "no Type"};
    }

}

export default NewSystemDataProcess;

import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getAllData } from "@/services/serviceOperations";

// Bu fonksiyon ile veri tabanından, cookie'den veya localstorage'dan veri çekme işlemleri yapılır.
// İlk olarak cookie veya localstorage'dan veri çekmeyi dener. Eğer veri çekilemezse veri tabanından çekmeye çalışır.
// Eğer veri tabanından da veri çekilemezse hata döndürür.
// Eğer veri tabanından veri çekilebilirse, cookie veya localstorage içine veri kaydı yapılır çünkü: bir sonraki istekte yeniden çekmesin diye.
const NewSystemDataProcess = async (
    req:NextApiRequest, 
    databaseTableName: string,
    data:any, 
    storageType: "localStorage" | "cookie" | "database"  = "database",
    cookieName?:string, 
    localStorageName?:string,
    sendStorageLocation:"localStorage" | "cookie" = "localStorage",
    
    ):Promise<any> => {
  
    try {

//1.0 #### GEREKLİ KONTROLLER ####################################################################################
        if((!req || !databaseTableName || !data) || (req == undefined || databaseTableName == undefined || data == undefined )){
            throw new Error("error788");
        }

//2.1 #### VERİTABANI KONTROLÜ VE İŞLEMLERİ ######################################################################
        if(storageType == "database" && databaseTableName){

            // veri tabanından veriyi çekme, cookie ve localstorage temizleme ve return etme işlemi uygulanacak.
            const data = await getAllData(databaseTableName);

            if(!data || data.error || data === undefined || data.length === 0){
                throw new Error("error789");
            }

            const responseCookies = NextResponse.next();

            // veri tabanından çekilen verileri cookie veya localstorage'a kaydediyoruz.
            if(sendStorageLocation == "localStorage"){
                localStorage.removeItem(databaseTableName);
                localStorage.setItem(databaseTableName, JSON.stringify(data));          
            }

            // veri tabanından çekilen verileri cookie veya localstorage'a kaydediyoruz.
            if(sendStorageLocation == "cookie"){
                responseCookies.cookies.delete(databaseTableName);
                responseCookies.cookies.set(databaseTableName, JSON.stringify(data));
            }                 

            // veri tabanından gelen veriyi kullanıcıya döndürürüz.
            return {error: null, data: data, status: "success", storageType: storageType};
        }
        
//2.2 #### COOKIE KONTROLÜ VE İŞLEMLERİ ##########################################################################
        else if(storageType == "cookie" && cookieName){
            const responseCookies = NextResponse.next();
            
            if(!responseCookies){
                throw new Error("error789");
            }

            // cookie'den veri çekme işlemi
            const checkCookie = responseCookies.cookies.get(cookieName);

            if(!checkCookie || checkCookie == undefined || checkCookie == null){
                throw new Error("error790");
            }

            // veri cookie'den gelmişse kullanıcıya döndürürüz.
            return {error: null, data: checkCookie, status: "success", storageType: storageType};
        }

//2.3 #### LOCALSTORAGE KONTROLÜ VE İŞLEMLERİ ####################################################################
        else if(storageType == "localStorage" && localStorage && localStorageName){
            
            // localstorage'dan veri çekme işlemi
            const checkLocalStor = localStorage.getItem(localStorageName);

            if(!checkLocalStor || checkLocalStor == undefined || checkLocalStor == null){
                throw new Error("error791");
            }

            // veri Localstorage'dan gelmişse kullanıcıya döndürürüz.
            return {error: null, data: checkLocalStor, status: "success", storageType: storageType};
        }
        
//3.0 #### HATA KONTROLÜ ########################################################################################

        else{
            throw new Error("error792");
        }

    } catch (error) {
        return {error: error, data: null, status: "error", storageType: "no Type"};
    }

}

export default NewSystemDataProcess;

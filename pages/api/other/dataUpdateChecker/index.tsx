import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import {getAllData, createNewData, deleteDataAll} from "@/services/serviceOperations";

interface data{
    Configdata? : string;
    
  error?: any
}

const handler = async (req:NextApiRequest, res:NextApiResponse):Promise<any> => {

    try {
        //  ( components / other / generalTopPageBanner.tsx )'den gelen istekler burada karşılanacak.
    if(req.method === 'GET'){
        
         getAllData("dataUpdateChecker").then((data) => {
            if(!data || data.error || data === undefined || data.length === 0){
                return res.status(500).json({status: "error", error: data.error, data: null});
            }
            return res.status(200).json({status: "success", data: data});
         });       
      
    }

    // ##########################################################################
    // ##########################################################################

    if(req.method === 'POST'){
        
        const responseCookies = NextResponse.next();

        if(!req.body){
            throw new Error("error778");
        }

        if(req.body.process === "updateData"){

            // fonksiyondangönderilen verileri burada alırız.
            const removeValue = await req.body.removeValue;

            if(removeValue && removeValue.length > 0 && responseCookies.cookies){

                removeValue.map((item:any) => {
                if(item != undefined && item != null && item && item.length > 0){

                    // cookie içerisinde değişen veri var mı kontrol ediyoruz.
                    const checkCookie = responseCookies.cookies.get(item);
                    const checkLocalStor = localStorage.getItem(item);

                    if(checkCookie && checkCookie != undefined && checkCookie != null){
                        // eğer değişen bir veri varsa cookie içinden temizliyoruz.
                        responseCookies.cookies.delete(item);
                    }

                    if(checkLocalStor && checkLocalStor != undefined && checkLocalStor != null){
                        // eğer değişen bir veri varsa localstorage içinden temizliyoruz.
                        localStorage.removeItem(item);
                    }

                }})
            } 
        }

        // veri tabanındaki tüm verileri sil.
        const deleteDataFromDb = await deleteDataAll("dataUpdateChecker");
        if(!deleteDataFromDb || deleteDataFromDb.error || deleteDataFromDb === undefined){
            return res.status(500).json({status: "error", error: deleteDataFromDb.error, data: null});
        }            

        // veri tabanına yeni veri ekliyoruz.
        const data:data = await createNewData("dataUpdateChecker", {Configdata: req.body.data});
        if(!data || data.error || data === undefined){
            return res.status(500).json({status: "error", error: data.error, data: null});
        }  

        return res.status(200).json({status: "success", data: data}); 
            
    }
    } catch (error) {
        return res.status(500).json({status: "error", error: error, data: null});
    }

}

export default handler;
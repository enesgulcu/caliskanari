import dataUpdateConfig from '@/functions/other/regularCheckSystemData/dataUpdateChecker/dataUpdateConfig';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server'
import {getAPI, postAPI} from "@/services/fetchAPI";

// Bu fonksiyon bir veri güncelleştirildiğinde çalışır ve güncellenen veri eğer sistem verisi ise
// ve "dataUpdateConfig" içerisinde yer alıyorsa, veri tabanında verinin güncellendiğine dair düzenleme yapar.
const DatabaseWhenUpdate = async (pathname:string, req:NextApiRequest):Promise<any> => {

    if((req.method == 'POST' && pathname)){
        
        const systemData = await JSON.parse(dataUpdateConfig())

        const systemDataRecord:string[] = []
        
        const pathLowerCase = pathname.toLowerCase();
        systemData.map((item:any) => {

        const itemLowerCase = item.name.toLowerCase();  
            if(pathLowerCase.includes(itemLowerCase)){
                systemDataRecord.push(item.name)
            }       
        })
        

        // systemDataRecord içindeki verileri databaseWhenUpdate apisine gönder.
        if(systemDataRecord.length >= 1 || systemDataRecord != undefined || systemDataRecord != null){
            const test =  await postAPI("/other/databaseWhenUpdate", systemDataRecord)
        }

        else{
            return NextResponse.next() 
        }   
        
    }
    else{
       return NextResponse.next()
    }
}

export default DatabaseWhenUpdate

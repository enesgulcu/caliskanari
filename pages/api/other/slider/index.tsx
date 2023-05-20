import { NextApiRequest, NextApiResponse } from 'next';
import {getAllData} from "@/services/serviceOperations";


const handler = async (req:NextApiRequest, res:NextApiResponse): Promise<void> => {

    //  ( components / other / slider.tsx )'den gelen istekler burada karşılanacak.
    if(req.method === 'GET'){
        try {
            const data = await getAllData("Slider");
            
            if(!data || data.error || data === undefined){
                throw new Error(data.error);
            }
            
            return res.status(200).json({status: "success", data: data});
        } catch (error:any) {
            return res.status(500).json({status: "error", error: error.message, data: null}); 
        }
    }
}
export default handler;
import { NextApiRequest, NextApiResponse } from 'next';
import {getAllData} from "@/services/serviceOperations";

interface IGeneralTopPageBanner {
    role: string, // admin -> panel kim içinse o tanımlanacak
    startBannerTime?: string,
    endBannerTime?: string,
    mainText?: string,
    detailText?: string,
    isActive?: boolean,
    buttonTextColor?: string;
    buttonLink?: string;
    buttonText?: string;

    mainTextColor?: string,
    underTextColor?: string,
    buttonColor?: string,
    backgroundColor?: string,

    error?:any
}

const handler = async (req:NextApiRequest, res:NextApiResponse): Promise<void> => {

    //  ( components / other / generalTopPageBanner.tsx )'den gelen istekler burada karşılanacak.
    if(req.method === 'GET'){

        try {
            const data:IGeneralTopPageBanner = await getAllData("GeneralTopPageBanner");
            
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
import { NextApiRequest, NextApiResponse } from 'next';
import authOptions from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const handler = async (req:NextApiRequest, res:NextApiResponse): Promise<void> => {

    const session = await getServerSession(req, res, authOptions)
    
    
    if(!session){
        return res.status(500).json({status: "error", error: "Oturum açmanız gerekiyor!"});
    }
    

    else if(req.method === 'POST' && session){
        try {

            const body = req.body;
            
            if(!body){
                throw new Error("Bir hata oluştu!");
            }

            //   role: pageRole, // admin -> panel kim içinse o tanımlanacak
            //   startBannerTime: "",
            //   endBannerTime: "",
            //   mainText: "",
            //   detailText: "",
            //   isActive: false,

            //   mainTextColor: mainTextColor,
            //   underTextColor: underTextColor,
            //   buttonColor: buttonColor,
            //   backgroundColor: backgroundColor,

            const {name, surname, email, password, role} = body;

            return res.status(200).json({status: "success",session:session, message: "api isteği başarılı"});

        } catch (error:any) {
            return res.status(500).json({status: "error", error: error.message}); 
        }
    }

    else{
        return res.status(500).json({status: "error", error: "Bir hata oluştu!"});
    }

}

export default handler;
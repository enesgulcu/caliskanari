import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req:NextApiRequest, res:NextApiResponse): Promise<void> => {

    if(req.method === "POST") {
        console.log("Method POST")
        return res.status(200).json({message: "Method POST"})
    }
    if(req.method === "GET") {
        console.log("Method GET")
        return res.status(200).json({message: "Method GET"})
    }

}

export default handler;
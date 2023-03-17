import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    const ip = req.headers['x-real-ip'] || req?.connection?.remoteAddress;
    const session = await getServerSession(req, res, authOptions)
    console.log(req)
    res.status(200).json({ IP: ip, session:session})

    
    
}
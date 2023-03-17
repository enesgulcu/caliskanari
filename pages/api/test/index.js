export default function handler(req, res) {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    console.log(ip)
    res.status(200).json({ IP: ip })
    
}
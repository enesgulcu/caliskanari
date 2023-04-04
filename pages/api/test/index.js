export default async function handler (req, res) {
    if(req.method === "POST") {
        console.log("Method POST")
        return res.status(200).json({message: "Method POST"})
    }
    if(req.method === "GET") {
        console.log("Method GET")
        return res.status(200).json({message: "Method GET"})
    }

}
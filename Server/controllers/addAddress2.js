
import Address from "../models/Address.js"

export const getAddress= async (req,res)=>{
    try {
        const {userId}=req.query
        
        if (!userId) {
            
            return res.json({ success: false, message: "User ID is required" });
          }
       const addresses= await Address.find({userId})
        res.json({success: true, addresses})
    } catch (error) {
        console.log(error.message)
        res.json({success: true, message: error.message})
    }
}
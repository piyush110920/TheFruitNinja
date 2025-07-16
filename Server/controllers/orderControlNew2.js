
import Order from "../models/Order.js"



const getUserOrders=async( req, res)=>{
    try {  
         const {userId} =req.query;
         if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
          }
        
          
         const orders= await Order.find({
            userId,
            $or : [{paymentType:"COD"}, {isPaid:true}]
         })
         .populate("items.product").
         populate("address")
        .sort({createdAt: -1}); 
        
         res.json({success: true, orders});
    } catch (error) {
        return res.json({success: false, message: error.message});    
    }
}
export default getUserOrders
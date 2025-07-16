import Order from "../models/Order.js"



//get all ordes (for seller/ admin ) : /api/order/seller

export  const getAllOrders=async( req, res)=>{
    try {
        
         const orders= await Order.find({
            
            $or : [{paymentType:"COD"}, {isPaid: true}]
         }).populate("items.product address").sort({createdAt: -1});
         res.json({success: true, orders});
    } catch (error) {
        return res.json({success: false, message: error.message});    
    }
}

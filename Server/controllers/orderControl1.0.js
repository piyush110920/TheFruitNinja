import { request } from "express"
import Order from "../models/Order.js"
import Product from "../models/product.js"
import stripe from "stripe"
import User from '../models/user.js'


 const placeOrderCOD= async (req,res)=>{
    try {
        const {userId, items, address} =req.body
        
        if(!address || items.length ===0){
            return res.json({success: false, message: "Invalid data"})
        }

        let amount =await items.reduce(async (acc, item)=>{
            const product= await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        },0)

        // Addv tax Charge 2%
        amount+= Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"COD"
        });


         return res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        return res.json({success: false, message: error.message});    
    }
}

export default placeOrderCOD
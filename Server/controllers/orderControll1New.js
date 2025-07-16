import { request } from "express"
import Order from "../models/Order.js"
import Product from "../models/product.js"
import stripe from "stripe"
import User from '../models/user.js'


// export  const placeOrderCOD= async (req,res)=>{
//     try {
//         const {userId, items, address} =req.body
        
//         if(!address || items.length ===0){
//             return res.json({success: false, message: "Invalid data"})
//         }

//         let amount =await items.reduce(async (acc, item)=>{
//             const product= await Product.findById(item.product);
//             return (await acc) + product.offerPrice * item.quantity;
//         },0)

//         // Addv tax Charge 2%
//         amount+= Math.floor(amount * 0.02);

//         await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType:"COD"
//         });


//          return res.json({success: true, message: "Order Placed Successfully"})
//     } catch (error) {
//         return res.json({success: false, message: error.message});    
//     }
// }

// export  const placeOrderStripe= async (req,res)=>{
//     try {
//         const {userId, items, address} =req.body

//         const {origin} =req.headers;
        
//         if(!address || items.length ===0){
//             return res.json({success: false, message: "Invalid data"})
//         }
//            let productData=[]   
//         let amount =await items.reduce(async (acc, item)=>{
//             const product= await Product.findById(item.product);
//             productData.push({
//                 name:product.name,
//                 price: product.offerPrice,
//                 quantity: item.quantity
//             })
//             return (await acc) + product.offerPrice * item.quantity;
//         },0)

//         // Addv tax Charge 2%
//         amount+= Math.floor(amount * 0.02);

//       const order=  await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType:"Online"
//         });

//                 // stripe gateway initialize
//                 const stripInstance= new stripe(process.env.STRIPE_SECRET_KEY);

//                 //create line items for stripe
        
//                 const line_items=productData.map((item)=>{
//                     return {
//                         price_data:{
//                             currency:"INR",
//                             product_data:{
//                                 name:item.name
//                             },
//                              unit_amount: Math.floor(item.price + item.price *0.02)  *100
//                         },
//                         quantity: item.quantity,
//                     }
//                 })
        
//                 // create session  
//                 const session= await stripInstance.checkout.sessions.create({
//                     line_items,
//                     mode: "payment",
//                     success_url: `${origin}/loader?next=MyOrders`,
//                     cancel_url: `${origin}/cart`,
//                     metadata:{
//                         orderId: order._id.toString(),
//                         userId,
//                     }
//                 })

//          return res.json({success: true, url: session.url})
//     } catch (error) {
//         console.log(error.message)
//         return res.json({success: false, message: error.message});    
//     }
// }


//stripe webhooks to verify payments action : /stripe

const stripWebhooks= async (request, response)=>{
    // stripe gateway initialize
    const stripInstance=new stripe(process.env.STRIPE_SECRET_KEY);

    const sig=request.headers["stripe-signature"];
    let event;

    try {
        event= stripInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        response.status(400).send(`Webhook Error: ${error.message}`)
    }

    //Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent= event.data.object;
            const paymentIntentId= paymentIntent.id;

            //getting seesion Metadata
            const session =await stripInstance.checkout.session.list({
                payment_intent: paymentIntentId,
            });

            const {orderId, userId} =session.data[0].metadata;
            //mark payment as paid

            await Order.findByIdAndUpdate(orderId,{isPaid: true})
           //clear user cart
           await User.findByIdAndUpdate(userId, {cartItems:{}})
           break;
        }
        case "payment_intent.payment_failed":{
            const paymentIntent=event.data.object;
            const paymentIntentId=paymentIntent.id;

            //getting Session Metadata
            const {orderId}=session.data[0].metadata;
            await Order.findByIdAndDelete(orderId)
            break;
        }
            default:
                console.error("Unhandled event type ${event.type")
            break;
    }
    response.json({received: true})
}

export default stripWebhooks
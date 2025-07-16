import user from "../models/user.js"



export const updateCart= async (req,res)=>{
    try {
        const {userId, cartItems} =req.body
        await user.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: "cart updated"})
    } catch (error) {
        console.log(error.message)
        res.json({suceess: false, message: error.message})
    }
}
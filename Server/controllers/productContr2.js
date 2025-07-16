
import Product from "../models/product.js"


// change product inStock : /api/product/stock
export const changeStock=async (req,res)=>{
    try {
        const {id, inStock}= req.body
        await Product.findByIdAndUpdate(id,{inStock})
        res.json({success: true, message: " Stock Updated"})
    } catch (error) {
     console.log(error.message)
     res.json({success: false, message: error.message})
 } 
    }
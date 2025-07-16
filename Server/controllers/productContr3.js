
import {v2 as cloudinary} from "cloudinary"
import Product from "../models/product.js"

// Get product : /api/product/list
export const productList=async (req,res)=>{
    try {
        const product =await Product.find({})
     
        res.json({success: true, product})
    } catch (error) {
     console.log(error.message)
     res.json({success: false, message: error.message})
     
    }
     
 }
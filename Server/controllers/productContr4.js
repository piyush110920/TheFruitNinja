import {v2 as cloudinary} from "cloudinary"
import Product from "../models/product.js"


// get single product : /api/product/Id
export const productById=async (req,res)=>{
    try {
        const {id} =req.body
        const product= await Product.findById(id)
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
        
    }
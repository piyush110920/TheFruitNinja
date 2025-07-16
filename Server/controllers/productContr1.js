import {v2 as cloudinary} from "cloudinary"
import Product from "../models/product.js"




// add product : /api/product/add
export const addProduct=async (req,res)=>{
    try {
       let productData=JSON.parse(req.body.productData)
   
       const images=req.files
     
       
       let imageUrl= await Promise.all(
           images.map(async (item)=>{
               let result= await cloudinary.uploader.upload(item.path,{resource_type:'image'});
               return result.secure_url
           })
       )
   
       await Product.create({...productData, image:imageUrl})
       res.json({success: true, message: "Product Added"});
   
    } catch (error) {
       console.log(error.message)
       res.json({success: false, message: error.message})
    }
   
   }
import {v2 as cloudinary} from "cloudinary"

const connectCloudinary= async ()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: "234121137745423",
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
}

export default connectCloudinary;
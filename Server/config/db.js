import mongoose from 'mongoose'

const connectDB=async ()=>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/quickGroceery`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        mongoose.connection.on('connect',()=> console.log("Database Connected"));

       
    } catch (error) {
         console.error(error.message );
    }
}
export default connectDB
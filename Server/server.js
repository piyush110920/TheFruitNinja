import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRouteNew.js';
import stripWebhooks from './controllers/orderControll1New.js';


const app=express()
const port=process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

app.post('/stripe', express.raw({type: 'application/json'}), stripWebhooks)

const allowedOrigins=['http://localhost:5173']

// Middlewares configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/',(req,res)=>{
     res.send("API is Working")}
    );
app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)

    
  app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
  })  

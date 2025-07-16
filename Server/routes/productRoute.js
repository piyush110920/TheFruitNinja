import express from 'express'
import {upload} from '../config/multer.js'
import authSeller from '../middlewares/authSeller.js';

import { addProduct } from '../controllers/productContr1.js';
import { changeStock } from '../controllers/productContr2.js';
import { productList } from '../controllers/productContr3.js';
import { productById } from '../controllers/productContr4.js';


const productRouter= express.Router();
productRouter.post('/add', upload.array(["images"]),authSeller, addProduct)

productRouter.get('/list', productList)

productRouter.get('/id', productById)

productRouter.post('/stock', authSeller, changeStock)


export default productRouter
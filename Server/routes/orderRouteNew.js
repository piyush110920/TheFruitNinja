import express from 'express'
import authUser from '../middlewares/authUser.js'

import authSeller from '../middlewares/authSeller.js'
import getUserOrders  from '../controllers/orderControlNew2.js'
import { getAllOrders } from '../controllers/orderControll3.js'

import  placeOrderCOD  from '../controllers/orderControl1.0.js'
import { placeOrderStripe } from '../controllers/orderControl1.1.js'

const  orderRouter= express.Router()

orderRouter.post('/cod', authUser,placeOrderCOD)

orderRouter.post('/stripe', authUser,placeOrderStripe)


orderRouter.get('/user', authUser,getUserOrders)



orderRouter.post('/seller', authSeller,getAllOrders)


export default orderRouter
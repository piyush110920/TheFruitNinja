import express from 'express'
import authUser from '../middlewares/authUser.js'
import { addAddress } from '../controllers/addAddress1.js';
import { getAddress } from '../controllers/addAddress2.js';
// import { addAddress, getAddress } from '../controllers/addressController.js'

const addressRouter=express.Router()

addressRouter.post('/addr', authUser, addAddress);

addressRouter.get('/get',authUser, getAddress);


 export default addressRouter


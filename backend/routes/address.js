const express=require('express')
const router=express.Router();
const {addAddress,getAddress}=require('../controller/address')
const {authencate,userMiddleware}=require('../middleware/middlewares')


router.post('/user/address/create',authencate,userMiddleware,addAddress)
router.post('/user/getaddress',authencate,userMiddleware,getAddress)


module.exports=router
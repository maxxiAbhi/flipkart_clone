const express=require('express')
const router=express.Router();
const {addOrder,getOrders,getOrder}=require('../controller/order')
const {authencate,userMiddleware}=require('../middleware/middlewares')


// router.post('/user/cart/addtocart',authencate,userMiddleware,addCart)
router.post('/addOrder',authencate,userMiddleware,addOrder)
router.get('/getOrders',authencate,userMiddleware,getOrders)
router.post('/getOrder',authencate,userMiddleware,getOrder)
// router.get('/user/cart/remove-from-cart',removeCart)

module.exports=router
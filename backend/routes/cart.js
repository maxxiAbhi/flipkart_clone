const express=require('express')
const router=express.Router();
const {addItemToCart,getCartItems,removeCartItems}=require('../controller/cart')
const {authencate,userMiddleware}=require('../middleware/middlewares')


// router.post('/user/cart/addtocart',authencate,userMiddleware,addCart)
router.post('/user/cart/addtocart',authencate,userMiddleware,addItemToCart)
router.post('/user/getCartItems',authencate,userMiddleware,getCartItems)
router.post('/user/cart/removeItem',authencate,userMiddleware,removeCartItems)
// router.get('/user/cart/remove-from-cart',removeCart)

module.exports=router
const express = require('express');
const { signup,signin,signout } = require('../../controller/admin/user');
const router=express.Router();
const {authencate}=require('../../middleware/middlewares')


router.post('/admin/signin',signin)


router.post('/admin/signup',signup)


router.post('/admin/signout',authencate,signout)



module.exports=router
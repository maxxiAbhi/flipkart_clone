const express = require('express');
const { signup,signin,signout } = require('../controller/user');
const router=express.Router();
const {authencate,userMiddleware}=require('../middleware/middlewares')
// const Users=require('../db/models/user')


router.post('/signin',signin)


router.post('/signup',signup)


router.post('/signout',authencate,signout)

router.get('/profile',authencate, (req, res)=> {
    res.status(200).send(req.rootUser)
  })




module.exports=router
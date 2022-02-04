const express = require('express');
const { getProduct } = require('../../controller/admin/initdata');
const router=express.Router();


router.post('/admin/getproduct',getProduct)

module.exports=router
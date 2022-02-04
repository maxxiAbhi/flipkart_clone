const express = require('express');
const { getCustomerOrders,updateOrder } = require('../../controller/admin/order.admin');
const router=express.Router();
const { authencate, adminMiddleware } = require('../../middleware/middlewares')

  
  router.post(`/order/update`, authencate, adminMiddleware, updateOrder);
  router.post(`/order/getCustomerOrders`,authencate,adminMiddleware,getCustomerOrders);
  
  module.exports = router;
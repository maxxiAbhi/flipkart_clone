const express=require('express')
const router=express.Router();
const {createProduct,getProductBySlug,getProductById}=require('../controller/product')
const {authencate,adminMiddleware}=require('../middleware/middlewares')
const multer=require('multer')
const {nanoid}=require('nanoid')
const path=require('path')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'public/Uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' +nanoid(10)+'-'+file.originalname)
    }
  })
  const upload=multer({storage})
   


router.post('/product/create',authencate,adminMiddleware,upload.array('productPictures'),createProduct)
router.get('/products/:slug',getProductBySlug)
router.get('/product/:id',getProductById)
router.get('/product/categoryid/:id',getProductByCategory)

module.exports=router
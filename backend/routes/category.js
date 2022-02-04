const express=require('express')
const router=express.Router();
const {addCategory,getCategory,updateCategory,deleteeCategory}=require('../controller/category')
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
   


router.post('/category/create',authencate,adminMiddleware,upload.array('categoryPictures'),addCategory)
router.get('/category/getcategory',getCategory)
router.post('/category/update',upload.array('categoryPictures'),updateCategory)
router.post('/category/delete',deleteeCategory)

module.exports=router
const express = require('express');
const router = express.Router();
const { createPage,getPage } = require('../../controller/admin/page');
const { authencate, adminMiddleware } = require('../../middleware/middlewares')
const multer = require('multer')
const { nanoid } = require('nanoid')
const path = require('path')
const datapath=require('../../root')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(datapath.dirr,'/public/Uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + nanoid(10) + '-' + file.originalname)
    }
})
const upload = multer({ storage })
// console.log(__dirname)
router.post('/page/create', authencate, adminMiddleware, upload.fields([{ name: 'banners' },{ name: 'products' }]), createPage)


router.post('/page/:category/:type', getPage)



module.exports = router
const Product = require('../../db/models/product')
const Category = require('../../db/models/category')
exports.getProduct = async (req, res) => {
    const getCategory=await Category.find({})
    const getproduct=await Product.find({}).select("id name slug price category quantity discription productPictures createdBy").populate({path:'category',select:'_id name'}).exec();
    if(getproduct){
        // const categoryList=createCategory(getcategory)
        res.status(200).json({getproduct,getCategory})
    }else{
     return res.status(422).json({
         error: 'Something went wrong'
     })
    }
 }
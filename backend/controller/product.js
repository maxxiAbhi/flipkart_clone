const Product = require('../db/models/product')
const slugify = require('slugify')
const Category = require('../db/models/category')
const e = require('express')


exports.createProduct = async (req, res) => {
    // res.status(200).json({file:req.files,body:req.body})
    try {
        const {
            name,
            price,
            discription,
            offers,
            reviews,
            category,
            quantity
        } = req.body
        if (!name || !price || !discription || !category || !quantity) {
            res.status(400).json({
                message: "Fillup all the filds"
            })
        }
        let productPictures = []

        if (req.files.length > 0) {
            productPictures = req.files.map(file => {
                return {
                    img: file.filename
                }
            })
        }
        const product = Product({
            name,
            slug: slugify(name),
            price,
            discription,
            offers,
            quantity,
            productPictures,
            reviews,
            category,
            createdBy: req.userId
        })
        const addproduct = await product.save()
        if (addproduct) {
            res.status(200).json({
                message: "Product Added Sucessfully"
            })
        } else {
            res.status(400).json({
                message: "Something went Wrong"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Product Already Avalible"
        })
    }
}

exports.getProductBySlug = async (req, res) => {
    const { slug } = req.params
    const getCategory = await Category.findOne({ slug: slug }).select('id type');
    if (getCategory) {
        const getProduct = await Product.find({ category: getCategory.id});
        // console.log(getCategory.id)
        // console.log(getProduct)
       if(getCategory.type){
        if (getProduct.length>0) {
            res.status(200).json({
                product: getProduct, productByPrice: {
                    under5k: getProduct.filter((product) => {
                        return product.price <= 5000
                    }),
                    under10k: getProduct.filter((product) => {
                        return product.price > 5000 && product.price <= 10000
                    }),
                    under15k: getProduct.filter((product) => {
                        return product.price > 10000 && product.price <= 15000
                    }),
                    under20k: getProduct.filter((product) => {
                        return product.price > 15000 && product.price <= 20000
                    }),
                    under30k: getProduct.filter((product) => {
                        return product.price > 20000 && product.price <= 30000
                    })
                }
            })
        } else {
            res.status(400).json({
                message: "Category y not Exist"
            })
        }
       }else{
        res.status(200).json({ getProduct });
       }
    } else {
        res.status(400).json({
            message: "Category not Exist"
        })
    }
}



exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const getProduct = await Product.findOne({
            _id: id
        });
        if (getProduct) {
            res.status(200).json({ product: getProduct })
        } else {
            res.status(400).json({ error: 'invalid id' })
        }
    } catch (error) {
        res.status(500).json({ error: 'invalid id' })
    }
}






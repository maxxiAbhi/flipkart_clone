const Categorys = require('../db/models/category')
const slugify = require('slugify')
const { nanoid } = require('nanoid')


const createCategory = (categories, parentId = null) => {
    const categoryList = []
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    let cate
    for (cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type:cate.type,
            children: createCategory(categories, cate._id)
        })
    }
    return categoryList
}


exports.addCategory = async (req, res) => {
    try {
        const categoryObj = {
            name: req.body.name,
            slug: `${slugify(req.body.name)}-${nanoid(5)}`,
            type:req.body.type,
            categoryImage: req.body.categoryPictures
        }
        if (req.body.parentId) {
            categoryObj.parentId = req.body.parentId
        }
        const cat = Categorys(categoryObj)
        const category = await cat.save()
        if (category) {
            return res.status(200).json({
                category: category,
                messager: 'Category Added Sucessfully'
            })
        } else {
            return res.status(422).json({
                error: 'Something went wrong'
            })
        }
    } catch (error) {
        return res.status(422).json({
            error: 'Category Already Avilable'
        })
    }
}



exports.getCategory = async (req, res) => {
    try {
        const getcategory = await Categorys.find({})
    if (getcategory) {
        const categoryList = createCategory(getcategory)
        res.status(200).json({ categoryList })
    } else {
        return res.status(422).json({
            error: 'Something went wrong'
        })
    }
    } catch (error) {
        res.status(422).json({
            error: 'Something went wrong'
        })
    }
}


exports.updateCategory = async (req, res) => {
    // res.status(200).json({message:"hello",name:req.body.name})
    // res.status(200).json({message:req.body})
    console.log(req.body)
    const { _id, name, parentId, type } = req.body;
    const updateCategories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            };
            if (parentId[i] != '') {
                // console.log(parentId)
                category.parentId = parentId[i];
            }
            //  updateCategories.push(category)
            const updateCategory = await Categorys.findByIdAndUpdate({ _id: _id[i] }, category, { new: true })
            updateCategories.push(updateCategory)
            // console.log(parentId.length)
        }
        // res.status(200).json({ updateCategories})
        res.status(200).json({ updateCategories })

    }
    else {
        console.log("hi")
        const category = {
            name,
            type
        };
        if (parentId != '') {
            category.parentId = parentId;
        }
        // res.status(200).json({ category })

        const updateCategory = await Categorys.findByIdAndUpdate({ _id }, category, { new: true })
        if (updateCategory) {
            res.status(200).json({ updateCategory })
        }
    }
}


exports.deleteeCategory = async (req, res) => {
    try {
        const { ids } = req.body.payload
        const deletecategories = []
        for (let i = 0; i < ids.length; i++) {
            const deletecat = await Categorys.findByIdAndDelete({ _id: ids[i]._id })
            deletecategories.push(deletecat)
        }
        console.log(deletecategories)
        console.log(deletecategories.length)
        console.log(ids.length)
        if (deletecategories.length === ids.length) {
            res.status(200).json({ message: 'Category Delete Sucessfully' })
        } else {
            res.status(400).json({ message: 'Something Went Wrong' })
        }

    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' })
    }
}
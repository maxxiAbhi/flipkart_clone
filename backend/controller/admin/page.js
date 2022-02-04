const Page=require('../../db/models/page')

exports.createPage=async(req,res)=>{
   try {
    const {title,discription,categoryId}=req.body 
    console.log(req.body )
    if(!title || !discription || !categoryId ){
     res.status(200).json({error:'All fild requred'})
    }else{
     const { banners,products } = req.files;
     if(banners.length >0){
         req.body.banners= banners.map((banner,index)=>{
             return ({img:`${process.env.API}/static/Uploads/${banner.filename}`,
             navigateTo: `/bannerClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`,})
         })
     }
     if(products.length >0){
         req.body.products= products.map((product,index)=>({
             img:`${process.env.API}/static/Uploads/${product.filename}`,
             navigateTo:`/productClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`
         }))
     }
    }
 
    const createdBy=req.rootUser._id
    const banners=req.body.banners
    const products=req.body.products
 
    const pageSchema={
     title,
     discription,
     banners,
     products,
     category:categoryId,
     createdBy
    }
    const pageSchemaWithoutCategoryId={
     title,
     discription,
     banners,
     products,
     createdBy
    }
    
   
    const isPageAllreadyAvilable=await Page.findOne({category:categoryId})
    // console.log(isPageAllreadyAvilable)


    if(isPageAllreadyAvilable){
        const pageUpdate=await Page.findOneAndUpdate({category:categoryId},pageSchemaWithoutCategoryId)
        if(pageUpdate){
         res.status(200).json({body:`Page Updated`})
        }
    }else{
        const page= new Page(pageSchema)
        console.log(page)
     const isPageSave=await page.save()
     if(isPageSave){
      res.status(200).json({body:isPageSave})
     }else{
      res.status(400).json({body:`Something went wrong`})
     }
    }



   } catch (error) {
    res.status(500).json({body:`Something went wrong with the Surver`})
   }
}


exports.getPage=async(req,res)=>{
    try {
    const { category, type } = req.params;
    if (type === "page") {
        // const getPageFromdb=await Page.findOne({ category: category });
        // console.log(getPageFromdb)
        // if(getPageFromdb){
        //      res.status(200).json({ page });
        // }else{
        //      res.status(400).json({ error });
        // }
        Page.findOne({ category: category }).exec((error, page) => {
            if (error) return res.status(400).json({ error });
            if (page) return res.status(200).json({ page });
          });
    }
    } catch (error) {
        res.status(500).json({ error });
    }
}


require('dotenv').config()
const express = require('express')
const app = express()
const port=process.env.PORT || 8000
const cors=require('cors')
const cookieParser=require('cookie-parser')
const path=require('path')


//static path
app.use('/static', express.static(path.join(__dirname, 'public')))


// database connection
const connection=require('./db/connection/dbconnection')
connection()

// parse application/json
// app.use(bodyParser.json())
app.use(express.json());

// routes
app.use(cookieParser())

app.use(cors())
const authRoutes=require('./routes/auth')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const adminAuthRoutes=require('./routes/admin/auth')
const cartRoutes=require('./routes/cart')
const getProduct=require('./routes/admin/initdata')
const addressRoutes=require('./routes/address')
const createPage=require('./routes/admin/page')
const orderPage=require('./routes/order')
const orderAdminPage=require('./routes/admin/order.routes')

app.use('/api',authRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',adminAuthRoutes)
app.use('/api',addressRoutes)
app.use('/api',cartRoutes)
app.use('/api',getProduct)
app.use('/api',createPage)
app.use('/api',orderPage)
app.use('/api',orderAdminPage)


app.get('/' , (req , res)=>{

   res.status(200).send('hello from simple server :)')

})

app.get("/myauth", function(req, res){

    res.cookie('token', 'someauthtoken')
    res.json({id: 2});
  });
 

 

 
app.listen(port,()=>{
    console.log(`lestining from ${port}`)
})
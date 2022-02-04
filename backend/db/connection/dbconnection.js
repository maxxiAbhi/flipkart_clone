const mongoose = require('mongoose');
const connection= async()=>{
const connect = await mongoose.connect('mongodb://localhost/flipkartClone', {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true});
if(connect){
    console.log('DB connect sucessfull ....')
    return connect
}else{
    console.log('DB connect unsucessfull')
}
}
module.exports=connection
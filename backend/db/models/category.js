const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    categoryImage:{
        type:String
    },
    type:{
        type:String 
    },
    parentId:{
        type:String,
    }
  
},{
    timestamps:true
});


  const categorys = mongoose.model('Category', categorySchema);

  module.exports=categorys
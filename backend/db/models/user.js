const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    phone:{
        type:String,
        required:true,
        min:10
    },
    profilePicture:{
        type:String,
        default:'userpic'
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
  },{
      timestamps:true
  }
  
  );

  userSchema.pre('save',async function (next){
    try {
       if(this.isModified('password')) {
           this.password=await bcrypt.hash(this.password,12)
           
       }
       next()
    } catch (error) {
        
    }
})

userSchema.methods.generateToken = async function (user){
    // console.log(user)
    try {
        let myToken=jwt.sign({_id:this._id,role:user._id},process.env.SECRET_JWT_KEY)
        this.tokens=this.tokens.concat({token:myToken})
        await this.save()
        return myToken
        
    } catch (error) {
        console.log(error)
    }
}

  const users = mongoose.model('users', userSchema);

  module.exports=users
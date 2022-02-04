const Users=require('../../db/models/user')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
exports.signup=async(req,res)=>{
    const {firstName,lastName,username,email,phone,password,repassword}=req.body
    if(!firstName || !lastName || !username || !email || !phone || !password || !repassword){
        return res.status(400).json({error:'plz filled all the filds properly'})
    }
    if(password!=repassword){
        return res.status(400).json({error:'password and repassword doest match'})
      }

      try {
        const userName=await Users.findOne({username})
   
        if(userName){
         return res.status(400).json({error:'username already exist'})
        }

        const userExist=await Users.findOne({email:email})
   
        if(userExist){
         return res.status(400).json({error:'email already exist'})
        }
        let role = "admin";
        const user=new Users({firstName:firstName,lastName:lastName,username,email,phone,password,role})
   
        const userReg=await user.save()
   
        if(userReg){
         return res.status(200).json({message:'user register sucessfully'})
        }else{
         return res.status(400).json({error:'failed to registered'})
        }
   
   
       } catch (error) {
         console.log(error)
       }
}




exports.signin=async(req,res)=>{
    const { username , password }=req.body
    if(!username || !password){
      return res.status(400).json({error:'plz filled all the filds properly'})
    }
    try {
      const userExist=await Users.findOne({username})
      if(userExist){
        if(userExist.role==='admin'){
          const isMatch=await bcrypt.compare(password,userExist.password);
          if(isMatch){
            console.log('ismatch')
            const token=await userExist.generateToken(userExist);
            res.cookie("jwtToken",token,{
              expires:new Date(Date.now+25892000000)    ///25892000000   means  30 days 
            })
            return res.status(200).json({message:'signin sucessfully',token:token,user:userExist})
          }else{
            console.log('error')
           return res.status(400).json({error:'password or email is invaild'})
          }
        }else{
          return res.status(400).json({error:'You are not admin'})
        }
      }else{
        return res.status(400).json({error:'password or email is invaild'})
      }
    } catch (error) {
      
    }
}

exports.signout=(req,res)=>{
  console.log('im here')
  res.clearCookie('jwtToken')
  res.status(200).json({message:"LogOut Sucessfully"})
}
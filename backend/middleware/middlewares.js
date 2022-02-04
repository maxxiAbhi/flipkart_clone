var jwt = require('jsonwebtoken');

const Users = require('../db/models/user')

exports.authencate = async (req, res, next) => {
    
    try {
      if(req.headers.authorization){
          const testToken=req.headers.authorization.split(' ')[1]
        // const token = req.cookies.jwtToken;
        // console.log(testToken)
        const verfyToken = jwt.verify(testToken, process.env.SECRET_JWT_KEY)
        // console.log(verfyToken)
        const rootUser = await Users.findOne({
            _id: verfyToken._id,
            // "tokens.token": token
        })
        // console.log(rootUser)
        if (!rootUser) {
            throw new Error('user not found')
        }
        // req.token = token
        // req.role=rootUser.role
        req.rootUser = rootUser
        req.userId = rootUser._id
      }else{
        res.status(401).send('Login First')
      }
        next()
    } catch (error) {
        res.status(401).send('unauthorised token')

    }
}


exports.adminMiddleware=(req, res, next)=>{
    if(req.rootUser.role !='admin'){
       return res.status(401).send('Acess Denied')
    }
    next()
}

exports.userMiddleware=(req, res, next)=>{
  // console.log(req.rootUser)
  if(req.rootUser.role !='user'){
     return res.status(401).send('Acess Denied')
  }
  next()
}
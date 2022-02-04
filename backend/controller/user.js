const Users = require('../db/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
exports.signup = async (req, res) => {


  const { firstName, lastName, signusername, email, phone, newpassword, repassword } = req.body
  const username = signusername;
  const password = newpassword;
  // console.log(req.body)
  if (!firstName || !lastName || !username || !email || !phone || !password || !repassword) {
    return res.status(422).json({ error: 'plz filled all the filds properly' })
  }
  if (password != repassword) {
    return res.status(422).json({ error: 'password and repassword doest match' })
  }
  // res.status(200).json({ firstName, lastName, username, email, phone, password, repassword })

  try {
    const userName = await Users.findOne({ username })

    if (userName) {
      return res.status(422).json({ error: 'username already exist' })
    }

    const userExist = await Users.findOne({ email: email })

    if (userExist) {
      return res.status(422).json({ error: 'email already exist' })
    }

    const user = new Users({ firstName: firstName, lastName: lastName, username, email, phone, password })

    const userReg = await user.save()

    if (userReg) {
      return res.status(200).json({ message: 'user register sucessfully' })
    } else {
      return res.status(500).json({ error: 'failed to redistered' })
    }


  } catch (error) {
    console.log(error)
  }
}




exports.signin = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(422).json({ error: 'plz filled all the filds properly' })
  }
  try {
    const userExist = await Users.findOne({ username })
    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);
      if (isMatch) {
        const token = await userExist.generateToken(userExist);
        res.cookie("jwtToken", token, {
          expires: new Date(Date.now + 25892000000)    ///25892000000   means  30 days 
        })
        // console.log(userExist)
        if (userExist.role === 'admin') {
          console.log('admin')
          return res.status(400).json({ error: 'access denied' })
        } else {
          console.log('user')
          return res.status(200).json({ message: 'signin sucessfully', token: token, user: userExist })
        }
      } else {
        return res.status(400).json({ error: 'password or email is invaild' })
      }
    } else {

    }
  } catch (error) {

  }
}


exports.signout = (req, res) => {
  console.log('im here')
  res.clearCookie('jwtToken')
  res.status(200).json({ message: "LogOut Sucessfully" })
}
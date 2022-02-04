const UserAddress = require("../db/models/address");

exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})
  const { payload } = req.body;
  if (payload.address) {
    if (payload.address._id) {
      UserAddress.findOneAndUpdate(
        { user: req.rootUser._id, "address._id": payload.address._id },
        {
          $set: {
            "address.$": payload.address,
          },
        }
      ).exec((error, address) => {
        if (error) return res.status(400).json({ error });
        if (address) {
          res.status(201).json({ address });
        }
      });
    } else {
      UserAddress.findOneAndUpdate(
        { user: req.rootUser._id },
        {
          $push: {
            address: payload.address,
          },
        },
        { new: true, upsert: true }
      ).exec((error, address) => {
        if (error) return res.status(400).json({ error });
        if (address) {
          res.status(201).json({ address });
        }
      });
    }
  } else {
    res.status(400).json({ error: "Params address required" });
  }
};

exports.getAddress =async (req, res) => {
  console.log('hi')
  console.log( req.rootUser._id )
  try {
    const userAddress=await UserAddress.findOne({ user: req.rootUser._id })
    console.log(userAddress)
  if(userAddress){
    res.status(200).json({ userAddress });
  }else{
    return res.status(400).json({ error });
  }
  } catch (error) {
    res.status(400).json({ error });
  }
  
  // .exec((error, userAddress) => {
  //   if (error) return res.status(400).json({ error });
  //   if (userAddress) {
  //     res.status(200).json({ userAddress });
  //   }
  // });
};
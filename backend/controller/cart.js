const Cart = require('../db/models/cart')

// exports.addCart = async (req, res) => {
//     try {
//         const isCartAvailable = await Cart.findOne({ user: req.userId })
//         console.log('Add To Cart')



//         if (isCartAvailable) {
//             const getproduct = req.body.cartItem.product
//             const isDuplicatedProductAvailable = isCartAvailable.cartItem.find((c) => {
//                 return c.product == getproduct
//             })
//             let condition,action;


//             if (isDuplicatedProductAvailable) {
//                 console.log(`update quantity`)
//                 // console.log(req.userId)
//                 // console.log(getproduct)
//                 condition={ user: req.userId, "cartItem.product": getproduct }
//                 action={
//                     $set: {
//                         "cartItem.$": {
//                             ...req.body.cartItem,
//                             quantity: isDuplicatedProductAvailable.quantity + 1
//                         }
//                     }
//                 }
//                 const updateCart = await Cart.findOneAndUpdate(condition,action, { upsert: true }, (err, doc) => {
//                         if (err) {
//                             res.status(500).json({ message: err })
//                         }
//                     })
//                 // console.log(updateCart)
//                 if (updateCart) {
//                     res.status(200).json({ message: 'Cart Updated' })
//                 } else {
//                     res.status(500).json({ message: 'Something went wrong in cart' })
//                 }

//             } else {
//                 console.log(`add product`)
//                 condition={ user: req.userId }
//                 action={
//                     "$push": {
//                         "cartItem": req.body.cartItem
//                     }
//                 }
//                 // const updateCart = 
//                 Cart.findOneAndUpdate(condition,action,{ "upsert": true,'new': true }).exec((err,succ)=>{
//                     if(err){return  res.status(500).json({ message: 'Something went wrong in cart' })}
//                     if(succ){return  res.status(200).json({ message: succ })}
//                 })

//                 // if (updateCart) {
//                 //     res.status(200).json({ message: 'Cart Updated' })
//                 // } else {
//                 //     res.status(500).json({ message: 'Something went wrong in cart' })
//                 // }
//             }



//         } else {
//             const cart = Cart({
//                 user: req.userId,
//                 cartItem: req.body.cartItem
//             })
//             console.log('create cart with a product')

//             const addCart = await cart.save()
//             if (addCart) {
//                 res.status(200).json({ message: 'add to sucessfully' })
//             }
//         }
//     } catch (error) {
//         res.status(200).json({ message: 'Something went wrong' })
//     }
// }











const runUpdate = async (condition, updateData) => {

  const updateCart = await Cart.findOneAndUpdate(condition, updateData, { upsert: true })
  return updateCart

}

exports.addItemToCart = async (req, res) => {

  const addToCart = await Cart.findOne({ user: req.rootUser._id })


  if (addToCart) {
    let promiseArray = [];
    req.body.cartItems.forEach((cartItem) => {
      const product = cartItem.product;
      const item = addToCart.cartItem.find((c) => c.product == product);
      let condition, update;
      if (item) {
        condition = { user: req.rootUser._id, "cartItem.product": product };
        console.log(condition)
        update = {
          $set: {
            "cartItem.$": cartItem,
          },
        };
      } else {
        condition = { user: req.rootUser._id };
        update = {
          $push: {
            cartItem: cartItem,
          },
        };
      }
      promiseArray.push(runUpdate(condition, update));
      Promise.all(promiseArray)
      .then((response) => res.status(201).json({ response }))
      .catch((error) => res.status(400).json({ error }));
      
    });
  }else{
    const cart = new Cart({
          user: req.rootUser._id,
          cartItem: req.body.cartItems,
        });
                cart.save((error, cart) => {
              if (error) return res.status(400).json({ error });
              if (cart) {
                return res.status(201).json({ cart });
              }
            });
  }

};

exports.getCartItems = async (req, res) => {
  console.log('get cart')
  try {
    const mycart = await Cart.findOne({ user: req.rootUser._id }).populate("cartItem.product", "_id name price productPictures")

    if (mycart) {
      let cartItems = {};
      mycart.cartItem.forEach((item, index) => {
        cartItems[item.product._id.toString()] = {
          _id: item.product._id.toString(),
          name: item.product.name,
          img: item.product.productPictures[0].img,
          price: item.product.price,
          qty: item.quantity,
        };
      });
      res.status(200).json({ cartItems });
    } else {
      return res.status(200).json({ msg: 'cart is empty' })
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
};

// new update remove cart items
exports.removeCartItems = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Cart.update(
      { user: req.rootUser._id },
      {
        $pull: {
          cartItem: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
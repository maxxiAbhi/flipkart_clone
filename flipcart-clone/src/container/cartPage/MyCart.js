import React, { useEffect, useState } from 'react'
import Card from "../../components/UI/Card";

import { MaterialButton } from "../../components/MaterialUi";

import CartItem from "../CartItem";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, getCartItems } from "../../actions/cart.action";
import { useHistory } from 'react-router-dom';

function MyCart(props) {
    const dispatch = useDispatch()
    const history=useHistory()
    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    // const cartItems=cart.cartItems
    const [cartItems, setCartItems] = useState(cart.cartItems)
  
    useEffect(() => {
      setCartItems(cart.cartItems)
    }, [cart.cartItems])
  
    useEffect(() => {
     if(auth.autenticate){
       dispatch(getCartItems())
     }
    }, [auth.autenticate])

    const onQuantityIncrement = (_id, qty) => {
        console.log(qty)
        console.log()
        const { name, price, img } = cartItems[_id]
        dispatch(addToCart({ _id, name, price, img }, 1))
      }
      const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id]
        dispatch(addToCart({ _id, name, price, img }, -1))
      }
    return (
        <>
        <Card
          headerLeft={`My Cart`}
          headerRight={<div>Deliver to</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
            />
          ))}

          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div className={props.hideButton} style={{ width: "250px" }}>
              <MaterialButton
                title="PLACE ORDER"
              onClick={() => history.push(`/checkout`)}
              />
            </div>
          </div>
        </Card>
        </>
    )
}

export default MyCart

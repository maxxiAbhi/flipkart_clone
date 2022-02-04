import React, { useEffect } from 'react'
import './style.css'
import MainHeadere from '../../components/header/mainHeader'
import MenuHeader from '../../components/header/menuHeader'
import { useSelector, useDispatch } from 'react-redux';
import {  getCartItems,removeCartItem } from "../../actions/cart.action";
import PriceDetails from '../../components/PriceDetails'
import MyCart from './MyCart'
function Cart() {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)
  // const cartItems=cart.cartItems

  useEffect(() => {
   if(auth.autenticate){
     dispatch(getCartItems())
   }
  }, [auth.autenticate])



  return (
    <>
      <MainHeadere />
      <MenuHeader />
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <MyCart />

        
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </>
  )
}

export default Cart

import { cartConstants } from "./constants"
import store from '../store'
import axios from "../helper/axios"


// export const addToCart = (product,newqty=null) => {
//     return async (dispatch) => {
//         console.log(product)
//         const { cartItems } = store.getState().cart
//         const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newqty) : 1;
//         cartItems[product._id] = {
//             ...product,
//             qty
//         };
//         localStorage.setItem('cart',JSON.stringify(cartItems));
//         dispatch({
//             type: cartConstants.ADD_TO_CART,
//             payload: {cartItems}
//         })


//     }
// }


// export const updateCart = (product) => {
//     return async (dispatch) => {
//         const cart=localStorage.getItem('cart')?
//         JSON.parse(localStorage.getItem('cart')):null
//         if(cart){
//             dispatch({
//                 type: cartConstants.ADD_TO_CART,
//                 payload: {cartItems:cart}
//             })
//         }


//     }
// }



const getCartItems = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
        const res = await axios.post(`/user/getCartItems`);
        if (res.status === 200) {
          const { cartItems } = res.data;
          console.log({ getCartItems: cartItems });
          if (cartItems) {
            dispatch({
              type: cartConstants.ADD_TO_CART_SUCESS,
              payload: { cartItems },
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const addToCart = (product, newQty = 1) => {
    return async (dispatch) => {
      const {cart: { cartItems },auth, } = store.getState();
      console.log(auth)

      const qty = cartItems[product._id]
        ? parseInt(cartItems[product._id].qty + newQty)
        : 1;
      cartItems[product._id] = {
        ...product,
        qty,
      };
  
      if (auth.autenticate) {
        dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
        const payload = {
          cartItems: [
            {
              product: product._id,
              quantity: qty,
            },
          ],
        };
        console.log('payload');
        console.log(payload);
        const res = await axios.post(`/user/cart/addtocart`, payload);
        console.log(res);
        if (res.status === 201) {
          dispatch(getCartItems());
        }
      } else {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
  
      console.log("addToCart::", cartItems);
  
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCESS,
        payload: { cartItems },
      });
    };
  };
  
  export const removeCartItem = (payload) => {
    return async (dispatch) => {
      try {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
        const res = await axios.post(`/user/cart/removeItem`, { payload });
        if (res.status === 202) {
          dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
          dispatch(getCartItems());
        } else {
          const { error } = res.data;
          dispatch({
            type: cartConstants.REMOVE_CART_ITEM_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const updateCart = () => {
    return async (dispatch) => {
      const { auth } = store.getState();
      let cartItems = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : null;
  
      console.log("upppppppppp");
  
      if (auth.authenticate) {
        localStorage.removeItem("cart");
        //dispatch(getCartItems());
        if (cartItems) {
          const payload = {
            cartItems: Object.keys(cartItems).map((key, index) => {
              return {
                quantity: cartItems[key].qty,
                product: cartItems[key]._id,
              };
            }),
          };
          if (Object.keys(cartItems).length > 0) {
            const res = await axios.post(`/user/cart/addtocart`, payload);
            if (res.status === 201) {
              dispatch(getCartItems());
            }
          }
        } else {
          dispatch(getCartItems());
        }
      } else {
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCESS,
            payload: { cartItems },
          });
        }
      }
    };
  };
  export { getCartItems };
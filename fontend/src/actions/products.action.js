import axiosInstance from "../helper/axios"
import { productsConstants } from "./constants"



export const addProduct = (form) => {
    return async (dispatch) => {
        dispatch({ type: productsConstants.ADD_PRODUCTS_REQUEST})
        console.log('add product action')
        const res = await axiosInstance.post('/product/create',form)
        console.log(res)
        console.log('add product action')
        if (res.status === 200) {
         dispatch({
                type: productsConstants.ADD_PRODUCTS_SUCESS,
                payload:{
                    message:res.data.message
                }
            })
        } else {
            dispatch({
                type: productsConstants.ADD_PRODUCTS_FAILURE,
                payload:{
                    message:res.data.message
                }
            })
        }
    }
}
import axiosInstance from "../helper/axios"
import { getProductByIdConstants } from "./constants"

export const getProductById = (productDetails) => {
    return async (dispatch) => {
        const {productId}=productDetails
        dispatch({ type: getProductByIdConstants.GET_PRODUCT_BY_ID_REQUEST })
        const res = await axiosInstance.get(`/product/${productId}`)
        console.log(res)
        const { product, error } = res.data
        if (res.status === 200) {
            dispatch({
                type: getProductByIdConstants.GET_PRODUCT_BY_ID_SUCESS,
                payload: {
                    product: product
                }
            })
        } else {
            dispatch({
                type: getProductByIdConstants.GET_PRODUCT_BY_ID_FAILURE,
                payload: {
                    error: error
                }
            })
        }
    }
}

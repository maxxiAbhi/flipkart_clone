import axiosInstance from "../helper/axios"
import { getproductsListBySlugConstants, getProductsPageConstants } from "./constants"

const getProductList = (slug) => {
    return async (dispatch) => {
        const res = await axiosInstance.get(`/products/${slug}`)
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: getproductsListBySlugConstants.GET_PRODUCTSLIST_BYSLUG,
                payload: res.data
            })
        }
    }
}
export default getProductList


const getProductListDefault = (slug) => {
    return async (dispatch) => {
        const res = await axiosInstance.get(`/products/${slug}`)
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: getproductsListBySlugConstants.GET_PRODUCTSLIST_BYSLUG_DEFAULT,
                payload: res.data
            })
        }
    }
}
export {getProductListDefault}


export const getPage = (payload) => {
    return async (dispatch) => {
        // dispatch({ type: productsConstants.ADD_PRODUCTS_REQUEST})
        try {
            const newPayload = payload.prams
            const { cid, type } = newPayload
            const res = await axiosInstance.post(`/page/${cid}/${type}`)
            console.log(res)
            dispatch({ type: getProductsPageConstants.GET_PRODUCTS_PAGE_REQUEST })
            if (res.status === 200) {
                const { page } = res.data
                dispatch({
                    type: getProductsPageConstants.GET_PRODUCTS_PAGE_SUCESS,
                    payload: { page }
                })
            } else {
                const { error } = res.data
                dispatch({
                    type: getProductsPageConstants.GET_PRODUCTS_PAGE_FAILURE,
                    payload: { error }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
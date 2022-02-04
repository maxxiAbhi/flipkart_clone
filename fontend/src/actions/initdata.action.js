import axiosInstance from "../helper/axios"
import { getproductsConstants, initDataConstants,  } from "./constants"

export const getAllProducts = () => {
    return async (dispatch) => {
        // dispatch({ type: initDataConstants.GET_ALL_INITDATA_REQUEST })
        const res = await axiosInstance.post('/admin/getproduct')
       
       if(res.status===200){
        const {getproduct,getCategory}=res.data
        dispatch({
             type: getproductsConstants.GET_PRODUCTS_SUCESS,
             payload:{
                 products:getproduct
             }
            
            })
       }
    }
}
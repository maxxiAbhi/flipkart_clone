import axios from "../helper/axios"
import { categotyConstants } from "./constants"

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categotyConstants.CATEGORY_REQUEST })
        const res = await axios.get('/category/getCategory')
        console.log(res)
        const { categoryList, error } = res.data
        if (res.status === 200) {
            dispatch({
                type: categotyConstants.CATEGORY_SUCESS,
                payload: {
                    category: categoryList
                }
            })
        } else {
            dispatch({
                type: categotyConstants.CATEGORY_FAILURE,
                payload: {
                    error: error
                }
            })
        }
    }
}



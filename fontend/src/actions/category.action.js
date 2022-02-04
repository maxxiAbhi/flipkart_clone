import axiosInstance from "../helper/axios"
import { categotyConstants } from "./constants"

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categotyConstants.CATEGORY_REQUEST })
        const res = await axiosInstance.get('/category/getCategory')
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


export const addCategory = (form) => {
    return async (dispatch) => {
        dispatch({ type: categotyConstants.CATEGORY_REQUEST })
        const res = await axiosInstance.post('/category/create',form)
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: categotyConstants.ADD_CATEGORY_SUCESS,
                payload:{category:res.data.category}

            })
        } else {
            dispatch({
                type: categotyConstants.ADD_CATEGORY_FAILURE,
                payload:res.data.error
            })
        }
    }
}


export const updateCategory = (form) => {
    return async (dispatch) => {
        console.log(form)
        const res = await axiosInstance.post('/category/update',form)
        console.log(res)
        if (res.status === 200) {
            return true
        } else{
            console.log(res)
        }
    }
}

export const deleteCategory = (ids) => {
    console.log(ids)
    return async (dispatch) => {
        const res = await axiosInstance.post('/category/delete',{
            payload:{
                ids
            }
        })
        if(res.status===200){
            return true
        }else{
            return false
        }
    }
}
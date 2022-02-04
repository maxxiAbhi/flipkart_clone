import axiosInstance from "../helper/axios"
import { authConstants, userConstants,cartConstants } from "./constants"


const login = (user) => {
    return async (dispatch) => {
        const res = await axiosInstance.post('/signin', {
            ...user
        })

        console.log(res)
        let error = res.data.error;
        if (res.status === 200) {
            const { token, user } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCESS,
                payload: {
                    token, user
                }
            })
            console.log("after log in")
            return true
        }
        if (res.status === 400) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: error
                }
            })
        }
    }
}
export default login


export const isUserLogin = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        if (token) {
            dispatch({
                type: authConstants.LOGIN_SUCESS,
                payload: {
                    token, user
                }
            })
        }
    }
}

export const signOut = () => {
    console.log('signout')
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        const res = await axiosInstance.post('/signout')
        console.log(res)
        let error = res.data.error;
        console.log(res.data)
        if (res.status === 200) {
            localStorage.clear()
            // localStorage.removeItem('user')
            // localStorage.removeItem('token')
            dispatch({ type: authConstants.LOGOUT_SUCESS })
            dispatch({ type: cartConstants.RESET_CART })
        } else {
            dispatch(
                {
                    type: authConstants.LOGOUT_FAILURE,
                    payload: {
                        error: error
                    }
                })
        }
    }
}

export const register = (user) => {
    console.log('userform')
    console.log(user)
    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REGISER_REQUEST })
        const res = await axiosInstance.post('/signup', { ...user })
        if (res.status === 200) {
            console.log('this work')
            console.log(res)
            const { message } = res.data
            dispatch({
                type: userConstants.USER_REGISER_SUCESS,
                payload: {
                    msg: message
                }
            })
            return true
        } else {
            dispatch({
                type: userConstants.USER_REGISER_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
            return false
        }
    }
}
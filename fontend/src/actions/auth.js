import axiosInstance from "../helper/axios"
import { authConstants } from "./constants"


const login = (user) => {
    return async (dispatch) => {
        const res = await axiosInstance.post('/admin/signin', {
            ...user
        })
        let error=res.data.error;
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
        } 
if(res.status === 400){
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


export const isUserLogin=()=>{
    return async (dispatch)=>{
        const token=localStorage.getItem('token')
        const user=JSON.parse(localStorage.getItem('user'))
        if(token){
            dispatch({
                type: authConstants.LOGIN_SUCESS,
                payload: {
                    token, user
                }
            })
        }
}
}

export const signOut=()=>{
    return async dispatch=>{
        dispatch({type: authConstants.LOGOUT_REQUEST})
        const res = await axiosInstance.post('admin/signout')
        let error=res.data.error;
        console.log(res.data)
        if(res.status===200){
            localStorage.clear()
            dispatch({type: authConstants.LOGOUT_SUCESS})
        }else{
            dispatch(
                {
                type: authConstants.LOGOUT_FAILURE,
                payload:{
                    error:error
                }
            })
        }
    }
}
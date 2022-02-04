import axiosInstance from "../helper/axios"
import { userConstants } from "./constants"

const register = (user) => {


    return async (dispatch) => {
        // dispatch({type: userConstants.USER_REGISER_REQUEST})
        const res = await axiosInstance.post('admin/signup', {...user})
        console.log(res.data)
        if (res.status === 200) {
            const { message } = res.data
            dispatch({
                type: userConstants.USER_REGISER_SUCESS,
                payload: {
                    msg:message
                }
            })
        } else {
            dispatch({
                type: userConstants.USER_REGISER_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}
export default register



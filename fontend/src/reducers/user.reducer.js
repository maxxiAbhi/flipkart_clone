import { userConstants } from "../actions/constants"

const initState={
    error:null,
    message:'',
    isucess:false,
    loading:false
}


export default (state=initState,action)=>{
    switch(action.type){
        case userConstants.USER_REGISER_REQUEST:{
            state={
                ...state,
                loading:true
            }
        }
        case userConstants.USER_REGISER_SUCESS:{
            state={
                ...state,
                isucess:true,
                loading:false,
                message:action.payload.msg
            }
        }
        case userConstants.USER_REGISER_FAILURE:{
            state={
                ...state,
                loading:false,
                message:action.payload.error
            }
        }
        
    }
    return state
}
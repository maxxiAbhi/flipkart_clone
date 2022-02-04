import { authConstants } from "../actions/constants"

const initState={
   token:null,
   user:{
       firstName:"",
       lastName:"",
       email:"",
       profilePictue:""
   },
   autenticate:false,
   autenticating:false,
   message:""
}

export default (state=initState,action)=>{
    console.log(action)
    switch(action.type){
        case authConstants.LOGIN_REQUEST:state={
            ...state,
            autenticating:true,
            error:action.payload.error
        }
        break;

        case authConstants.LOGIN_SUCESS:      
        state={
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            autenticate:true,
            autenticating:false,
            loading:false,
            error:null,
            message:""
        }
        break;
        case authConstants.LOGOUT_REQUEST:
        state={
            ...state,
            loading:true
        }
        case authConstants.LOGOUT_SUCESS:
        state={
            ...initState
        }
        case authConstants.LOGOUT_FAILURE:
        state={
            ...state,
            error:action.payload,
           loading:false
        }
        break;
        case authConstants.LOGIN_FAILURE:state={
           message:action.payload.error
        }
        break;

    }
    return state;
}
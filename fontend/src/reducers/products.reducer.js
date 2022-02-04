import { productsConstants } from "../actions/constants"

const initState={
    errorMessage:'',
    sucessMessage:''
}
console.log('product reducer work')

export default (state=initState,action)=>{
    console.log(action)
    switch(action.type){
        case productsConstants.ADD_PRODUCTS_SUCESS:state={
            ...state,
            sucessMessage:action.payload.message
        }
        break;
        case productsConstants.ADD_PRODUCTS_FAILURE:state={
            ...state,
            errorMessage:action.payload.message
        }
        break;
    }
    return state
}

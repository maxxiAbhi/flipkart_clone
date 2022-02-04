import { getproductsConstants, initDataConstants } from "../actions/constants"

const initState={
    products:[]
}

export default (state=initState,action)=>{
    console.log(action)
    switch(action.type){
        case getproductsConstants.GET_PRODUCTS_SUCESS:state={
            ...state,
            products:action.payload.products
        }
        break;
    }
    return state
}

import { getProductByIdConstants } from '../actions/constants'


const initState = {
    product: {},
    isProductAvilable:false,
    loading:false
}
export default (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case getProductByIdConstants.GET_PRODUCT_BY_ID_REQUEST:
            state = {
                ...state,
               loading:true
            }
            break;
            case getProductByIdConstants.GET_PRODUCT_BY_ID_SUCESS:
                state = {
                    ...state,
                   loading:false,
                   isProductAvilable:true,
                   product:action.payload.product
                }
                break;
                case getProductByIdConstants.GET_PRODUCT_BY_ID_SUCESS:
                state = {
                    ...state,
                   loading:false,
                   isProductAvilable:false,
                }
                break;
    }
    return state
}

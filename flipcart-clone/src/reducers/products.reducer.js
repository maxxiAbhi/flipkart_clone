import { getproductsListBySlugConstants,getProductsPageConstants } from '../actions/constants'

const initState = {
    products: [],
    productByPrice: {},
    pageRequest: false,
    page: {},
    error:null
}

export default (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case getproductsListBySlugConstants.GET_PRODUCTSLIST_BYSLUG:
            state = {
                ...state,
                products: action.payload.product,
                productByPrice: { ...action.payload.productByPrice }
            }
            break;
            case getproductsListBySlugConstants.GET_PRODUCTSLIST_BYSLUG_DEFAULT:
                state = {
                    ...state,
                    products: action.payload.getProduct
                }
                break;
        case getProductsPageConstants.GET_PRODUCTS_PAGE_REQUEST:
            state = {
                ...state,
                pageRequest:true
            }
            break;
        case getProductsPageConstants.GET_PRODUCTS_PAGE_SUCESS:
            state = {
                ...state,
                page: action.payload.page,
                pageRequest:false
            }
            break;
        case getProductsPageConstants.GET_PRODUCTS_PAGE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                pageRequest:true
            }
            break;


    }
    return state
}

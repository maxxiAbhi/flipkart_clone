import { combineReducers } from "redux";
import categoryReducer from './category.reducer'
import productReducer from './products.reducer'
import authReducer from './auth'
import getProductDetailsReducer from './getProductDetails.reducer'
import cartReducer from './cart.reducer'
import userReducer from './user.reducer'


const rootReducer= combineReducers({
    auth:authReducer,
    category:categoryReducer,
    product:productReducer,
    productDetails:getProductDetailsReducer,
    cart:cartReducer,
    user: userReducer
})
export default rootReducer
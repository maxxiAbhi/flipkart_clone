import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from './user.reducer'
import categoryReducer from './category.reducer'
import initdataReducer from './initdata.reducer'
import addProduct from './products.reducer'
import orderReducer from './order.reducer'
console.log(authReducer)
const rootReducer= combineReducers({
    auth:authReducer,
    user: userReducer,
    category:categoryReducer,
    initdata:initdataReducer,
    addproduct:addProduct,
    order:orderReducer
})
export default rootReducer
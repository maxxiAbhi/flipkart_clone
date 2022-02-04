import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'


console.log(rootReducer)
const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
export default store;


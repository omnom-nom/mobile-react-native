import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CustomerInfoReducer from './CustomerInfoReducer';

export default combineReducers({
    auth: AuthReducer,
    customer_info: CustomerInfoReducer
});
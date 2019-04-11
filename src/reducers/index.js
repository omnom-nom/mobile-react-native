import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CustomerInfoReducer from './CustomerInfoReducer';
import GoogleSessionReducer from './GoogleSessionReducer';
import ApiKeyReducer from './ApiKeyReducer';

export default combineReducers({
    auth: AuthReducer,
    customer_info: CustomerInfoReducer,
    google_api_session_info: GoogleSessionReducer,
    api_keys: ApiKeyReducer
});
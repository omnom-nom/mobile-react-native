import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CustomerInfoReducer from './CustomerInfoReducer';
import ApiKeyReducer from './ApiKeyReducer';
import DeliveryAddressReducer from './DeliveryAddressReducer';
import SessionTokenReducer from './SessionTokenReducer';

export default combineReducers({
    auth: AuthReducer,
    customer_info: CustomerInfoReducer,
    session_tokens: SessionTokenReducer,
    api_keys: ApiKeyReducer,
    delivery_info: DeliveryAddressReducer
});
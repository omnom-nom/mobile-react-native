import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CustomerInfoReducer from './CustomerInfoReducer';
import ApiKeyReducer from './ApiKeyReducer';
import DeliveryAddressReducer from './DeliveryAddressReducer';
import SessionTokenReducer from './SessionTokenReducer';
import OrderReducer from './OrderReducer';
import MerchantReducer from './MerchantReducer';
import DishReducer from './DishReducer';
import CookOrdersReducers from './CookOrdersReducers';
import CookDishReducer from './CookDishReducer';
import NewDishReducer from './NewDishReducer';
import CookMenuScreenReducer from './CookMenuScreenReducer';

export default combineReducers({
    auth: AuthReducer,
    customer_info: CustomerInfoReducer,
    session_tokens: SessionTokenReducer,
    api_keys: ApiKeyReducer,
    delivery_info: DeliveryAddressReducer,
    order_info: OrderReducer,
    merchant_info: MerchantReducer,
    dish_info: DishReducer,
    cook_orders: CookOrdersReducers,
    cook_dishes: CookDishReducer,
    new_dish: NewDishReducer,
    // screen state
    cook_menu_screen: CookMenuScreenReducer
});
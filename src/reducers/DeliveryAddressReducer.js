import { CUSTOMER_DELIVERY_LOCATION, CUSTOMER_ADDRESSES } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {

}
const logger = new Logger("[DeliveryAddressReducer]", loggerConfig.level)
export default (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_DELIVERY_LOCATION:
            logger.debug("CUSTOMER_DELIVERY_LOCATION ");
            return { ...state, customer_delivery_address: action.payload }
        case CUSTOMER_ADDRESSES: // stores the list of customer addresses for autocomplete
            logger.debug("CUSTOMER_ADDRESSES ");
            return { ...state, customer_delivery_autocomplete_addresses: action.payload }
        default:
            return state
    }
};

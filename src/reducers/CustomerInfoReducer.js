import { CUSTOMER_TYPE, CUSTOMER_INFO, CUSTOMER_DELIVERY_LOCATION, CUSTOMER_ADDRESSES } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {

}
const logger = new Logger("[CustomerInfoReducer]", loggerConfig.debug)
export default (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_TYPE:
            logger.debug("CUSTOMER_TYPE ");
            return { ...state, customer_type: action.payload }
        case CUSTOMER_INFO:
            logger.debug("CUSTOMER_INFO ");
            return { ...state, customer_info: action.payload }
        case CUSTOMER_DELIVERY_LOCATION:
            logger.debug("CUSTOMER_DELIVERY_LOCATION ");
            return { ...state, customer_delivery_address: action.payload }
        case CUSTOMER_ADDRESSES:
            logger.debug("CUSTOMER_ADDRESSES ");
            return { ...state, customer_delivery_autocomplete_addresses: action.payload }
        default:
            return state
    }
};

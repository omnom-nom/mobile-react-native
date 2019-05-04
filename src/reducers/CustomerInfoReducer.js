import { CUSTOMER_TYPE, CUSTOMER_INFO, CUSTOMER_ADDRESSES } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';

const initialState = {}
const logger = new Logger("[CustomerInfoReducer]", loggerConfig.level)
export default (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_TYPE:
            logger.debug("CUSTOMER_TYPE ");
            return { ...state, customer_type: action.payload }
        case CUSTOMER_INFO:
            logger.debug("CUSTOMER_INFO");
            return { ...state, ...action.payload }
        default:
            return state
    }
};

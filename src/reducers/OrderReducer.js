import { ORDER_DELIVERY_ADDRESS } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {

}
const logger = new Logger("[OrderReducer]", loggerConfig.level)
export default (state = initialState, action) => {
    logger.debug(action)
    switch (action.type) {
        case ORDER_DELIVERY_ADDRESS:
            logger.debug("ORDER_DELIVERY_ADDRESS ");
            return { ...state, delivery_address: action.payload }
        default:
            return state
    }
};

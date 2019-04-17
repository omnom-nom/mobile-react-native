import { MERCHANTS } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {

}
const logger = new Logger("[MerchantReducer]", loggerConfig.level)
export default (state = initialState, action) => {
    switch (action.type) {
        case MERCHANTS:
            logger.debug("MERCHANTS ");
            return { ...state, merchants: action.payload }
        default:
            return state
    }
};

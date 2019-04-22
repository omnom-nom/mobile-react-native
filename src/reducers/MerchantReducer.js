import { MERCHANTS, MERCHANT_CURRENT } from '../actions/types.js';
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
        case MERCHANT_CURRENT:
            logger.debug("MERCHANT_CURRENT ");
            return { ...state, merchant_current: action.payload }
        default:
            return state
    }
};

merchantMap = (merchants) => {
    merchant_map = new Map()
    merchants.forEach(merchant => {
        merchant_map.set(merchant.id, merchant)
    });
    return merchant_map
}
import { FETCHING_MERCHANTS, MERCHANTS, MERCHANT_CURRENT } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {
    fetching_merchants: false
}
export default (state = initialState, action) => {
    const logger = new Logger("[MerchantReducer]", loggerConfig.level)
    switch (action.type) {
        case MERCHANTS:
            logger.debug("MERCHANTS ");
            return { ...state, merchants: action.payload }
        case MERCHANT_CURRENT:
            logger.debug("MERCHANT_CURRENT ");
            return { ...state, merchant_current: action.payload }
        case FETCHING_MERCHANTS:
            logger.debug("FETCHING_MERCHANTS ");
            return { ...state, fetching_merchants: action.payload }
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
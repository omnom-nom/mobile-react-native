import { DISH_CURRENT } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {
}
export default (state = initialState, action) => {
    const logger = new Logger("[DishReducer]", loggerConfig.level)
    switch (action.type) {
        case DISH_CURRENT:
            logger.debug("DISH_CURRENT ");
            return { ...state, dish_current: action.payload }
        default:
            return state
    }
};
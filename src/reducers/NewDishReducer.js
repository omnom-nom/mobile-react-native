import { SAVING_DISH, SAVING_DISH_FAILED } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';

const initialState = {
    saving: false,
    failed: false
}

export default (state = initialState, action) => {
    const logger = new Logger("[NewDishReducer]", loggerConfig.level)
    switch (action.type) {
        case SAVING_DISH:
            logger.debug("SAVING_DISH ");
            return { ...state, saving: action.payload }
        case SAVING_DISH_FAILED:
            logger.debug("SAVING_DISH_FAILED ");
            return { ...state, failed: true }
        default:
            return state
    }
};

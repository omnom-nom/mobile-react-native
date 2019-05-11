import { NEW_REQUESTS_TODAY, NEW_REQUESTS_TOMORROW } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
import { List } from 'immutable'

const initialState = {
    today: List(),
    tomorrow: List()
}

export default (state = initialState, action) => {
    const logger = new Logger("[CookOrdersReducers]", loggerConfig.level)
    const { type, payload } = action
    switch (type) {
        case NEW_REQUESTS_TODAY:
            logger.debug("NEW_REQUESTS_TODAY ");
            return { ...state, today: state.today.push(payload) }

        case NEW_REQUESTS_TOMORROW:
            logger.debug("NEW_REQUESTS_TOMORROW ");
            return { ...state, tomorrow: state.tomorrow.push(payload), }
        default:
            return state
    }
};
import { NEW_REQUESTS } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';

const initialState = {
    requests: {
        today: [],
        tomorrow: []
    }
}

export default (state = initialState, action) => {
    const logger = new Logger("[CookOrdersReducers]", loggerConfig.level)
    const { type, payload } = action
    switch (type) {
        case NEW_REQUESTS:
            logger.debug("NEW_REQUESTS ");
            requests = addRequest(payload, state.requests)
            return { ...state, requests }
        default:
            return state
    }
};

addRequest = (order, requests) => {
    today = [].concat(requests.today)
    tomorrow = [].concat(requests.tomorrow)
    if (order.type === 'today') today.push(order)
    if (order.type === 'tomorrow') tomorrow.push(order)
    return {
        today,
        tomorrow
    }
}

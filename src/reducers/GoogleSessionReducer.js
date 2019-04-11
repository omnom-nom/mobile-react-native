import { GOOGLE_PLACES_API_SESSION_TOKEN } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {

}
const logger = new Logger("[GoogleSessionReducer]", loggerConfig.debug)
export default (state = initialState, action) => {
    switch (action.type) {
        case GOOGLE_PLACES_API_SESSION_TOKEN:
            logger.debug("GOOGLE_PLACES_API_SESSION_TOKEN ");
            return { ...state, places_session_token: action.payload }
        default:
            return state
    }
};

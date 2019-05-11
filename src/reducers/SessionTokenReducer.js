import { GOOGLE_PLACES_API_SESSION_TOKEN } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {

}
export default (state = initialState, action) => {
    const logger = new Logger("[SessionTokenReducer]", loggerConfig.level)
    switch (action.type) {
        case GOOGLE_PLACES_API_SESSION_TOKEN:
            logger.debug("GOOGLE_PLACES_API_SESSION_TOKEN ");
            return { ...state, google_places_session_token: action.payload }
            
        default:
            return state
    }
};

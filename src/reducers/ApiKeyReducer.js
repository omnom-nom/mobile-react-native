import { GOOGLE_PLACES_API_KEY } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {

}
const logger = new Logger("[ApiKeyReducer]", loggerConfig.level)
export default (state = initialState, action) => {
    switch (action.type) {
        case GOOGLE_PLACES_API_KEY:
            logger.debug("GOOGLE_PLACES_API_KEY ");
            return { ...state, google_places_api_key: action.payload }
        default:
            return state
    }
};

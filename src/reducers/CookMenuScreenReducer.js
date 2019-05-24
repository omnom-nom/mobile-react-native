import { COOK_MENU_LOADING } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';

import _ from 'lodash'

const initialState = {
    loading: false
}
export default (state = initialState, action) => {
    const logger = new Logger("[CookMenuScreenReducers]", loggerConfig.level)
    const { type, payload } = action
    switch (type) {
        case COOK_MENU_LOADING:
            return {
                loading: payload
            }
        default:
            return state
    }
};

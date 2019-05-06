import { DISHES } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
import { DishOrderTypeEnum } from '../screens/cook/enums';

import _ from 'lodash'

const initialState = {
    onDemand: [],
    preOrder: []
}
export default (state = initialState, action) => {
    const logger = new Logger("[CookDishReducers]", loggerConfig.level)
    const { type, payload } = action
    switch (type) {
        case DISHES:
            logger.debug("DISHES ");
            if (payload.orderType === DishOrderTypeEnum.ON_DEMAND) {
                state.onDemand.push(payload)
                return { ...state, onDemand: state.onDemand }
            }
            state.preOrder.push(payload)
            return { ...state, preOrder: state.preOrder }
        default:
            return state
    }
};

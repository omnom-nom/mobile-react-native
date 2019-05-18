import { DISHES } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
import { DishOrderTypeEnum } from '../screens/cook/enums';
// import produce from "immer"
import { Map, merge } from 'immutable'

import _ from 'lodash'

const initialState = {
    onDemand: Map(),
    preOrder: Map()
}
export default (state = initialState, action) => {
    const logger = new Logger("[CookDishReducers]", loggerConfig.level)
    const { type, payload } = action
    switch (type) {
        case DISHES:
            onDemand = state.onDemand
            preOrder = state.preOrder
            if (payload.orderType === DishOrderTypeEnum.ON_DEMAND) onDemand = onDemand.set(payload.id, payload)
            if (payload.orderType === DishOrderTypeEnum.PRE_ORDER) preOrder = preOrder.set(payload.id, payload)
            return { ...state, preOrder, onDemand }
        default:
            return state
    }
};

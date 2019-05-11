import { DISHES } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
import { DishOrderTypeEnum } from '../screens/cook/enums';
import produce from "immer"

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
            onDemand = produce(state.onDemand, draft => { draft.push(payload) })
            if (payload.orderType === DishOrderTypeEnum.ON_DEMAND) { return { ...state, onDemand } }
            preOrder = produce(state.preOrder, draft => { draft.push(payload) })
            return { ...state, preOrder }
        default:
            return state
    }
};

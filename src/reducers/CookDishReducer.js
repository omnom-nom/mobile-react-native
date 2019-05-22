import { DISHES, UPDATED_DISH, DELETED_DISH } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
import { DishOrderTypeEnum, StatusTypeEnum } from '../screens/cook/enums';
import { Map, merge } from 'immutable'

import _ from 'lodash'

const initialState = {
    active: {
        onDemand: Map(),
        preOrder: Map()
    },
    inactive: {
        onDemand: Map(),
        preOrder: Map()
    }
}
export default (state = initialState, action) => {
    const logger = new Logger("[CookDishReducers]", loggerConfig.level)
    const { type, payload } = action
    switch (type) {
        case DISHES:
            if (payload.status === StatusTypeEnum.ACTIVE) {
                if (payload.order === DishOrderTypeEnum.ON_DEMAND) {
                    onDemand = state.active.onDemand.set(payload.id, payload)
                    return {
                        ...state,
                        active: {
                            ...state.active,
                            onDemand
                        }
                    }
                }
                if (payload.order === DishOrderTypeEnum.PRE_ORDER) {
                    preOrder = state.active.preOrder.set(payload.id, payload)
                    return {
                        ...state,
                        active: {
                            ...state.active,
                            preOrder
                        }
                    }
                }
            } else {
                if (payload.order === DishOrderTypeEnum.ON_DEMAND) {
                    onDemand = state.inactive.onDemand.set(payload.id, payload)
                    return {
                        ...state,
                        inactive: {
                            ...state.inactive,
                            onDemand
                        }
                    }
                }
                if (payload.order === DishOrderTypeEnum.PRE_ORDER) {
                    preOrder = state.inactive.preOrder.set(payload.id, payload)
                    return {
                        ...state,
                        inactive: {
                            ...state.inactive,
                            preOrder
                        }
                    }
                }
            }

        case UPDATED_DISH:
            activeOnDemand = state.active.onDemand
            activePreOrder = state.active.preOrder
            inactiveOnDemand = state.inactive.onDemand
            inactivePreOrder = state.inactive.preOrder
            if (activeOnDemand.has(payload.id)) activeOnDemand = activeOnDemand.delete(payload.id)
            if (activePreOrder.has(payload.id)) activePreOrder = activePreOrder.delete(payload.id)
            if (inactiveOnDemand.has(payload.id)) inactiveOnDemand = inactiveOnDemand.delete(payload.id)
            if (inactivePreOrder.has(payload.id)) inactivePreOrder = inactivePreOrder.delete(payload.id)
            if (payload.status === StatusTypeEnum.ACTIVE && payload.order === DishOrderTypeEnum.ON_DEMAND) activeOnDemand = activeOnDemand.set(payload.id, payload)
            if (payload.status === StatusTypeEnum.ACTIVE && payload.order === DishOrderTypeEnum.PRE_ORDER) activePreOrder = activePreOrder.set(payload.id, payload)
            if (payload.status === StatusTypeEnum.INACTIVE && payload.order === DishOrderTypeEnum.ON_DEMAND) inactiveOnDemand = inactiveOnDemand.set(payload.id, payload)
            if (payload.status === StatusTypeEnum.INACTIVE && payload.order === DishOrderTypeEnum.PRE_ORDER) inactivePreOrder = inactivePreOrder.set(payload.id, payload)

            return {
                ...state,
                active: {
                    onDemand: activeOnDemand,
                    preOrder: activePreOrder
                },
                inactive: {
                    onDemand: inactiveOnDemand,
                    preOrder: inactivePreOrder
                }
            }

        case DELETED_DISH:
            activeOnDemand = state.active.onDemand
            activePreOrder = state.active.preOrder
            inactiveOnDemand = state.inactive.onDemand
            inactivePreOrder = state.inactive.preOrder
            if (activeOnDemand.has(payload)) activeOnDemand = activeOnDemand.delete(payload)
            if (activePreOrder.has(payload)) activePreOrder = activePreOrder.delete(payload)
            if (inactiveOnDemand.has(payload)) inactiveOnDemand = inactiveOnDemand.delete(payload)
            if (inactivePreOrder.has(payload)) inactivePreOrder = inactivePreOrder.delete(payload)
            return {
                ...state,
                active: {
                    onDemand: activeOnDemand,
                    preOrder: activePreOrder
                },
                inactive: {
                    onDemand: inactiveOnDemand,
                    preOrder: inactivePreOrder
                }
            }

        default:
            return state
    }
};

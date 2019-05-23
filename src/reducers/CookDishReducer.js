import { DISHES, UPDATED_DISH, DELETED_DISH } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
import { StatusTypeEnum } from '../screens/cook/enums';
import { Map, merge } from 'immutable'

import _ from 'lodash'

const initialState = {
    active: {
        menu: Map()
    },
    inactive: {
        menu: Map()
    }
}
export default (state = initialState, action) => {
    const logger = new Logger("[CookDishReducers]", loggerConfig.level)
    const { type, payload } = action
    switch (type) {
        case DISHES:
            if (payload.status === StatusTypeEnum.ACTIVE) {
                menu = state.active.menu.set(payload.id, payload)
                return {
                    ...state,
                    active: {
                        menu
                    }
                }
            } else {
                menu = state.inactive.menu.set(payload.id, payload)
                return {
                    ...state,
                    inactive: {
                        menu
                    }
                }

            }

        case UPDATED_DISH:
            activeMenu = state.active.menu
            inactiveMenu = state.inactive.menu
            if (activeMenu.has(payload.id)) activeMenu = activeMenu.delete(payload.id)
            if (inactiveMenu.has(payload.id)) inactiveMenu = inactiveMenu.delete(payload.id)
            if (payload.status === StatusTypeEnum.ACTIVE) activeMenu = activeMenu.set(payload.id, payload)
            if (payload.status === StatusTypeEnum.INACTIVE) inactiveMenu = inactiveMenu.set(payload.id, payload)
            return {
                ...state,
                active: {
                    menu: activeMenu
                },
                inactive: {
                    menu: inactiveMenu
                }
            }

        case DELETED_DISH:
            activeMenu = state.active.menu
            inactiveMenu = state.inactive.menu
            if (activeMenu.has(payload)) activeMenu = activeMenu.delete(payload)
            if (inactiveMenu.has(payload)) inactiveMenu = inactiveMenu.delete(payload)
            return {
                ...state,
                active: {
                    menu: activeMenu
                },
                inactive: {
                    menu: inactiveMenu
                }
            }

        default:
            return state
    }
};

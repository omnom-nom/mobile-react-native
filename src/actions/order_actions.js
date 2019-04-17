
import { REMOVE_FROM_CART, ADD_TO_CART, DELETE_FROM_CART } from './types.js';
import { Logger } from 'aws-amplify'
import { loggerConfig } from '../cmn/AppConfig'
import { store } from '../store'
import _ from 'lodash'

logger = new Logger("[OrderAction]", loggerConfig.level)

export const addToCart = (item) => {
    logger.debug("adding item to cart ", item.id)
    return (dispatch) => {
        dispatch({
            type: ADD_TO_CART,
            payload: item
        })
    }
}

export const removeFromCart = (item) => {
    logger.debug("removing item from cart ", item.id)
    return (dispatch) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: item
        })
    }
}

export const deleteFromCart = (item) => {
    logger.debug("deleting item from cart ", item.id)
    return (dispatch) => {
        dispatch({
            type: DELETE_FROM_CART,
            payload: item
        })
    }
}

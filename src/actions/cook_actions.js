
import { NEW_REQUESTS, ADD_NEW_DISH, DISHES } from './types.js';
import { Logger } from 'aws-amplify'
import { loggerConfig } from '../cmn/AppConfig'
import { store } from '../store'
import _ from 'lodash'


export const newRequests = () => {
    logger = new Logger("[CookAction]", loggerConfig.level)
    logger.debug("listening for incoming requests")

    return (dispatch) => {
        [
            {
                dish: 'Onion Dosa',
                orderNumber: '#71646237',
                time: 'NOW',
                type: 'today'
            },
            {
                dish: 'Onion Dosa',
                orderNumber: '#71646238',
                time: 'NOW',
                type: 'today'
            },
            {
                dish: 'Masala Dosa',
                orderNumber: '#71646289',
                time: '06:00 PM',
                type: 'today'
            },
            {
                dish: 'Onion Dosa',
                orderNumber: '#71646234',
                time: '9:30 AM',
                type: 'tomorrow'
            },
            {
                dish: 'Onion Dosa',
                orderNumber: '#71646233',
                time: '12:30 PM',
                type: 'tomorrow'
            },
            {
                dish: 'Masala Dosa',
                orderNumber: '#71646229',
                time: '06:00 PM',
                type: 'tomorrow'
            }
        ].map((o) => {
            dispatch({
                type: NEW_REQUESTS,
                payload: o
            })
        })
    }
}

export const getAllDishes = () => {
    logger = new Logger("[CookAction]", loggerConfig.level)
    logger.debug("getting all the dishes and listing to new ones")
    let dishes = []
    // get all the dishes and listing to new additions from cook
    return (dispatch) => {
        dishes.forEach((dish) => dispatchDish(dispatch, dish))
    }
}

export const listenToNewDishes = () => {
    logger = new Logger("[CookAction]", loggerConfig.level)
    logger.debug("listing to new dishes")
    //listing to new additions from cook {use gql subscription}
    dish = {}
    return (dispatch) => {
        dispatchDish(dispatch, dish)
    }
}

export const dispatchDish = (dispatch, dish) => {
    logger = new Logger("[CookAction]", loggerConfig.level)
    logger.debug("dispatching to dish", dish)
    //listing to new additions from cook
    dispatch({
        type: DISHES,
        payload: dish
    })
}

export const addNewDish = (dish) => {
    logger = new Logger("[CookAction]", loggerConfig.level)
    logger.debug("adding a new dish", dish)
    // save it on the server
    return (dispatch) => {
        dispatchDish(dispatch, {
            ...dish,
            id: uuidv4()
        })
    }
}

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


import { NEW_REQUESTS_TODAY, NEW_REQUESTS_TOMORROW, ADD_NEW_DISH, DISHES, SAVING_DISH, SAVING_DISH_FAILED } from './types.js';
import { Logger } from 'aws-amplify'
import { loggerConfig } from '../cmn/AppConfig'
import { store } from '../store'
import { getImageUrl } from '../apis/aws'
import { starting_action, ending_action } from './cmn'
import { addDish, getDishes, getDish, subscribeDishesForCook } from '../apis/dishes'
import uuid from 'uuid/v4'
import _ from 'lodash'


export const loadCook = () => {
    logger = new Logger("[CookAction]", loggerConfig.level)
    logger.debug("loading cook data")
    return async (dispatch) => {
        dishSubscription = subscribeDishesForCook("1", async (id) => {
            dish = await getDish(id)
            logger.debug("GotNewDish", dish)
            dispatchDish(dispatch, dish)
        })
        // save the subscription in the state
        dishes = await getDishes("1")
        dishes.forEach((dish) => dispatchDish(dispatch, dish))
    }
}

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
            type = o.type === 'today' ? NEW_REQUESTS_TODAY : NEW_REQUESTS_TOMORROW
            dispatch({
                type,
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

export const addNewDish = (dish, navigate) => {
    logger = new Logger("[CookAction]", loggerConfig.level)
    logger.debug("adding a new dish", dish)
    return async (dispatch) => {
        try {
            // dispatch a load action for new dish screen
            starting_action(dispatch, SAVING_DISH)
            await addDish(dish)
            // call the save dish graph ql
            ending_action(dispatch, SAVING_DISH)
            navigate()
        } catch (error) {
            logger.error('an error occurred', error)
            ending_action(dispatch, SAVING_DISH)
        }
    }
}


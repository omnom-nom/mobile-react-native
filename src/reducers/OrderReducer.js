import { ORDER_DELIVERY_ADDRESS, ADD_TO_CART, REMOVE_FROM_CART, DELETE_FROM_CART } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
import _ from 'lodash'

const initialState = {
    items: new Map(),
    subTotal: 0,
    taxAndFees: 0,
    delivery: 0,
    total: 0
}
const logger = new Logger("[OrderReducer]", loggerConfig.level)
export default (state = initialState, action) => {
    switch (action.type) {
        case ORDER_DELIVERY_ADDRESS:
            logger.debug("ORDER_DELIVERY_ADDRESS ");
            return { ...state, delivery_address: action.payload }
        case ADD_TO_CART:
            logger.debug("ADD_TO_CART ");
            items = addToCart(state, action.payload)
            subTotal = getSubTotal(items)
            taxAndFees = getTaxAndFees(subTotal)
            delivery = getTaxAndFees(subTotal)
            total = getTotal(subTotal, taxAndFees, delivery)
            return { ...state, items, subTotal, taxAndFees, delivery, total }
        case REMOVE_FROM_CART:
            logger.debug("REMOVE_FROM_CART ");
            items = removeFromCart(state, action.payload)
            subTotal = getSubTotal(items)
            taxAndFees = getTaxAndFees(subTotal)
            delivery = getTaxAndFees(subTotal)
            total = getTotal(subTotal, taxAndFees, delivery)
            return { ...state, items, subTotal, taxAndFees, delivery, total }
        case DELETE_FROM_CART:
            logger.debug("DELETE_FROM_CART ");
            items = deleteFromCart(state, action.payload)
            subTotal = getSubTotal(items)
            taxAndFees = getTaxAndFees(subTotal)
            delivery = getTaxAndFees(subTotal)
            total = getTotal(subTotal, taxAndFees, delivery)
            return { ...state, items, subTotal, taxAndFees, delivery, total }
        default:
            return state
    }
};

itemFromSameCook = (inState, item) => {
    return !_.isEmpty(inState.items) && inState.items.values().next().value.cook === item.cook
}

addToCart = (inState, item) => {
    let oldItems = inState.items
    if (!itemFromSameCook(inState, item)) {
        oldItems = new Map()
    }
    const v = oldItems.has(item.id) ? oldItems.get(item.id).count : 0
    oldItems.set(item.id, { ...item, count: v + 1 })
    return copyMap(oldItems)
}

removeFromCart = (inState, item) => {
    let v = inState.items.has(item.id) ? inState.items.get(item.id).count - 1 : 0
    v = v < 0 ? 0 : v
    inState.items.set(item.id, { ...item, count: v })
    return copyMap(inState.items)
}

deleteFromCart = (inState, item) => {
    inState.items.delete(item.id)
    return copyMap(inState.items)
}

copyMap = (oldMap) => {
    const newItems = new Map()
    oldMap.forEach((v, k, map) => {
        newItems.set(k, v)
    });
    return newItems
}

getSubTotal = (items) => {
    let subTotal = 0
    items.forEach((v, k, map) => {
        subTotal = subTotal + _.toNumber(v.price) * v.count
    })
    return _.floor(subTotal, 2)
}

getTaxAndFees = (subTotal) => {
    return _.floor(subTotal * 0.1, 2)
}

getDeliveryFee = (subTotal) => {
    return _.floor(subTotal * 0.2, 2)
}

getTotal = (subTotal, taxAndFees, delivery) => {
    return _.floor(subTotal + taxAndFees + delivery, 2)
}
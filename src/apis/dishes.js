import { API, graphqlOperation, Logger } from "aws-amplify";
import { loggerConfig } from '../cmn/AppConfig'
import * as queries from '../graphql/queries'
import { saveImage, deleteImages, getImagesUrl } from './aws'
import * as mutations from '../graphql/mutations'
import * as subscriptions from '../graphql/subscriptions'
import uuid from 'uuid/v4'
import _ from 'lodash'

export const addDish = async (dish) => {
    const logger = new Logger("[addNewDish]", loggerConfig.level)
    logger.debug(`adding new dish...`, dish)
    const { name, price, description, content, images, spice, order, foodType } = dish
    let keys = []
    try {
        const uploads = images.map(async image => {
            const key = await saveImage(image, `${'test_cook'}/images/${uuid()}`)
            if (_.isNull(key)) {
                dispatch({
                    type: SAVING_DISH_FAILED
                })
            }
            return key
        })
        keys = await Promise.all(uploads)
    } catch (error) {
        logger.error('an error occurred', error)
        throw error
    }

    try {
        contents = Object.create(null)
        content.forEach((c) => {
            contents[c.name] = c.count
        })
        const input = { cookId: "1", name, price, description, content: JSON.stringify(contents), images: keys, spice, order, foodType, status: 'active' }
        const result = await API.graphql(graphqlOperation(mutations.createDish, { input }));
        return result.data.createDish
    } catch (error) {
        logger.error('an error occurred', error)
        deleteImages(keys)
        throw error
    }
}

export const getDishes = async (id) => {
    const logger = new Logger("[getDishes]", loggerConfig.level)
    logger.debug(`getting dishes for cook: `, id)
    try {
        const result = await API.graphql(graphqlOperation(listDishes('description', 'images', 'name', 'foodType', 'spice', 'order', 'content', 'id', 'price', 'status'), {
            filter: {
                cookId: {
                    eq: id
                }
            }
        }));
        convertor = result.data.listDishes.items.map(async (i) => await dishConvertor(i))
        dishes = await Promise.all(convertor)
        return dishes
    } catch (error) {
        logger.error('an error occurred', error)
        throw error
    }
}

export const getDish = async (id) => {
    const logger = new Logger("[getDish]", loggerConfig.level)
    logger.debug(`getting dish : `, id)
    try {
        const result = await API.graphql(graphqlOperation(queries.getDish, { "cookId": "1", id }));
        return await dishConvertor(result.data.getDish)
    } catch (error) {
        logger.error('an error occurred', error)
        throw error
    }
}

export const subscribeDishesForCook = (id, onNextCallback) => {
    const logger = new Logger("[subscribeDishesForCook]", loggerConfig.level)
    logger.debug(`subscribing to dishes for cook: `, id)
    try {
        const subscription = API.graphql(
            graphqlOperation(`subscription OnCreateDish(
                $cookId: ID
              ) {
                onCreateDish(
                  cookId: $cookId
                ) {
                  id
                  cookId
                }
              }`, { "cookId": id })
        ).subscribe({
            next: ({ value }) => onNextCallback(value.data.onCreateDish.id)
        });
        return subscription
    } catch (error) {
        logger.error('an error occurred', error)
        throw error
    }
}

const listDishes = (...items) => {
    let query = _.template(`query ListDishes(
        $filter: TableDishFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {<%= itemsString %>}
          nextToken
        }
      }`
    )
    const itemsString = _.join(items, '  ')
    return query({ itemsString })
}

const dishConvertor = async (dishDromDb) => {
    images = await getImagesUrl(dishDromDb.images)
    return {
        ...dishDromDb,
        content: JSON.parse(dishDromDb.content),
        images
    }
} 
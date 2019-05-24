import { API, graphqlOperation, Logger, Storage } from "aws-amplify";
import { loggerConfig } from '../cmn/AppConfig'
import * as queries from '../graphql/queries'
import { saveImage, deleteImages, getImagesUrl } from './aws'
import * as mutations from '../graphql/mutations'
import * as subscriptions from '../graphql/subscriptions'
import uuid from 'uuid/v4'
import _ from 'lodash'
import { StatusTypeEnum } from "../screens/cook/enums";

export const addDish = async (dish) => {
    const logger = new Logger("[addNewDish]", loggerConfig.level)
    logger.debug(`adding new dish...`, dish)
    const { name, price, description, content, images, spice, time, foodType } = dish
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
        logger.debug('an error occurred', error)
        throw error
    }

    try {
        contents = Object.create(null)
        content.forEach((c) => {
            contents[c.name] = c.count
        })
        const input = { cookId: "1", name, price, description, content: JSON.stringify(contents), images: keys, spice, time, foodType, status: StatusTypeEnum.ACTIVE }
        const result = await API.graphql(graphqlOperation(mutations.createDish, { input }));
        return result.data.createDish
    } catch (error) {
        logger.debug('an error occurred', error)
        deleteImages(keys)
        throw error
    }
}

export const deleteDish = async (id, cookId) => {
    const logger = new Logger("[deleteDish]", loggerConfig.level)
    logger.debug(`deleting dish...`, id, cookId)
    try {
        let result = await getDishRaw(id, cookId, item = ['images'])
        result = await API.graphql(graphqlOperation(`mutation DeleteDish($input: DeleteDishInput!) {
            deleteDish(input: $input) { id cookId } 
        }`, {
                input: {
                    id, cookId
                }
            }
        ));
        deleteImages(result.images)
    } catch (error) {
        logger.debug('an error occurred', error)
        throw error
    }
}

export const getDishes = async (id) => {
    const logger = new Logger("[getDishes]", loggerConfig.level)
    logger.debug(`getting dishes for cook: `, id)
    try {
        const result = await API.graphql(graphqlOperation(listDishes('description', 'images', 'name', 'foodType', 'spice', 'time', 'content', 'id', 'price', 'status'), {
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
        logger.debug('an error occurred', error)
        throw error
    }

}

const getDishRaw = async (id, cookId, items = ['description', 'images', 'name', 'foodType', 'spice', 'time', 'content', 'id', 'price', 'status']) => {
    try {
        const result = await API.graphql(graphqlOperation(getDishQuery(items), { cookId, id }));
        return result.data.getDish
    } catch (error) {
        logger.debug('an error occurred', error)
        throw error
    }
}

export const getDish = async (id, cookId = "1") => {
    const logger = new Logger("[getDish]", loggerConfig.level)
    logger.debug(`getting dish : `, id)
    try {
        const result = await getDishRaw(id, cookId)
        return await dishConvertor(result)
    } catch (error) {
        logger.debug('an error occurred', error)
        throw error
    }
}

export const subscribeDishesForCook = (id, onNew, onUpdate, onDelete) => {
    const logger = new Logger("[subscribeDishesForCook]", loggerConfig.level)
    logger.debug(`subscribing to dishes for cook: `, id)
    try {
        const onCreatedSubscription = API.graphql(
            graphqlOperation(`subscription OnCreateDish($cookId: ID) {
                onCreateDish(cookId: $cookId) {
                  id
                  cookId
                }
              }`, { "cookId": id })
        ).subscribe({
            next: ({ value }) => onNew(value.data.onCreateDish.id)
        });
        const onUpdateSubscription = API.graphql(
            graphqlOperation(`subscription OnUpdateDish($cookId: ID) {
                onUpdateDish(cookId: $cookId) {
                  id
                  cookId
                }
              }`, { "cookId": id })
        ).subscribe({
            next: ({ value }) => {
                console.log(value);
                onUpdate(value.data.onUpdateDish)
            }
        });
        const onDeleteSubscription = API.graphql(
            graphqlOperation(`subscription OnDeleteDish($cookId: ID) {
                onDeleteDish(cookId: $cookId) {
                  id
                  cookId
                }
              }`, { "cookId": id })
        ).subscribe({
            next: ({ value }) => {
                logger.debug('subscription: deleted a dish')
                onDelete(value.data.onDeleteDish)
            }
        });

        return {
            onCreatedSubscription,
            onUpdateSubscription,
            onDeleteSubscription
        }
    } catch (error) {
        logger.debug('an error occurred', error)
        throw error
    }
}


export const updateDish = async (id, cookId, updates) => {
    const logger = new Logger("[updateDish]", loggerConfig.level)
    logger.debug(`updating dish : `, {
        cookId, id,
        ...updates
    })
    try {
        const result = await API.graphql(graphqlOperation(mutations.updateDish, {
            input: {
                cookId, id,
                ...updates
            }
        }));
        return await dishConvertor(result.data.updateDish)
    } catch (error) {
        logger.debug('an error occurred', error)
        throw error
    }
}

const getDishQuery = (...items) => {
    let query = _.template(
        `query GetDish($id: ID!, $cookId: ID!) {
            getDish(id: $id, cookId: $cookId) {
                <%= itemsString %>
            }
          }`
    )
    const itemsString = _.join(items, '  ')
    return query({ itemsString })
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

export const dishConvertor = async (dishDromDb) => {
    images = await getImagesUrl(dishDromDb.images)
    return {
        ...dishDromDb,
        content: JSON.parse(dishDromDb.content),
        images
    }
} 
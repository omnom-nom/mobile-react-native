import { API, graphqlOperation, Logger } from "aws-amplify";
import { loggerConfig } from '../cmn/AppConfig'
import * as queries from '../graphql/queries'
import * as mutations from '../graphql/mutations'
import _ from 'lodash'


export const user_exists = async (email) => {
    const logger = new Logger("[Users]", loggerConfig.level)
    logger.debug(`checking if user exists...`, email)
    const users = await API.graphql(graphqlOperation(queries.getUser, { email }));
    return !_.isNull(users.data.getUser)
}

export const user = async (email) => {
    const logger = new Logger("[Users]", loggerConfig.level)
    logger.debug(`getting...`, email)
    const users = await API.graphql(graphqlOperation(queries.getUser, { email }));
    return users.data.getUser
}

export const create_user = async (phone, email, name, type) => {
    const logger = new Logger("[Users]", loggerConfig.level)
    exists = await user_exists(email)
    if (exists) {
        throw {
            message: "User with the email exists."
        }
    } else {
        logger.debug("adding a new users ...", phone, email, name, type)
        const createUserInput = { phone, email, name, type }
        await API.graphql(graphqlOperation(mutations.createUser, { input: createUserInput }));
    }
}

export const delete_user = async (email) => {
    const logger = new Logger("[Users]", loggerConfig.level)
    exists = await user_exists(email)
    if (exists) {
        logger.debug("deleting users ...", email)
        const deleteUserInput = { email }
        await API.graphql(graphqlOperation(mutations.deleteUser, { input: deleteUserInput }));
    } else {
        logger.error("Unable to delete the user because the user does not exists")
    }
}


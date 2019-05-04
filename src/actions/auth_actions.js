import { SIGNIN, SIGNUP, SIGNIN_ERROR, SIGNUP_ERROR, CODE_ERROR, CODE, FORGOT_PASSWORD_ERROR, RESET_PASSWORD_ERROR, CUSTOMER_INFO, GOOGLE_PLACES_API_KEY } from './types.js';
import { getSecret } from '../apis/aws'
import { user, create_user, delete_user } from '../apis/users'
import { loggerConfig } from '../cmn/AppConfig'
import { Auth, Logger } from "aws-amplify";
import _ from 'lodash'

logger = new Logger("[AuthAction]", loggerConfig.level)

export const check_session = (navigate) => {
    return async (dispatch) => {
        logger.debug("checking app session")
        try {
            let data = await Auth.currentSession()
            email = data.getAccessToken().decodePayload().username
            if (_.isUndefined(email)) {
                throw "email id not present in the cognito access token"
            }
            curr_user = await user(email)
            dispatch({
                type: CUSTOMER_INFO,
                payload: {
                    ...curr_user
                }
            })
            await fetch_api_key(dispatch, 'google_places', GOOGLE_PLACES_API_KEY)
            if (curr_user.type === 'customer') {
                navigate("customer")
            }
            if (curr_user.type === 'cook') {
                navigate("cook")
            }
        } catch (error) {
            logger.error("an error occurred: ", error)
            navigate("auth")
        }
    }
}

fetch_api_key = async (dispatch, secret_name, type) => {
    const api_key = await getSecret(secret_name)
    dispatch({
        type: type,
        payload: api_key
    })
}

export const signin = (signin_data, navigate) => {
    logger.debug("signing in")
    return async (dispatch) => {
        try {
            const success_data = await Auth.signIn({
                username: signin_data.email,
                password: signin_data.password,
            })
            curr_user = await user(success_data.getUsername())
            await fetch_api_key(dispatch, 'google_places', GOOGLE_PLACES_API_KEY)
            dispatch({
                type: CUSTOMER_INFO,
                payload: {
                    ...curr_user
                }
            })
            dispatch({
                type: SIGNIN,
            })
            if (curr_user.type === 'customer') {
                navigate("customer")
            }
            if (curr_user.type === 'cook') {
                navigate("cook")
            }
        } catch (error) {
            logger.error("an error occurred: ", error)
            if (error.code === "UserNotConfirmedException") {
                navigate("signin_code", {
                    email: signin_data.email
                })
            }
            dispatch({
                type: SIGNIN_ERROR,
                payload: error.message
            })
        }
    }
}

export const signout = (navigate) => {
    logger.debug("signing out")
    return async (dispatch) => {
        try {
            await Auth.signOut()
            // dispatch({
            //     type: RESET,
            // })
            navigate("auth")
        } catch (error) {
            logger.error("an error occurred: ", error)
        }
    }
}

export const signup = (signup_data, navigate) => {
    logger.debug("signing up")
    return async (dispatch, getState) => {
        try {
            await create_user(signup_data.phone_number, signup_data.email, signup_data.name, getState().customer_info.customer_type)
        } catch (error) {
            logger.error("an error occurred: ", error)
            dispatch({
                type: SIGNUP_ERROR,
                payload: error.message
            })
            return
        }

        try {
            await Auth.signUp({
                username: signup_data.email,
                password: signup_data.password,
                attributes: {
                    email: signup_data.email,
                },
            })
            dispatch({
                type: SIGNUP,
                payload: {
                    email: signup_data.email,
                    name: signup_data.name,
                    phone_number: signup_data.phone_number
                }
            })
            navigate("signup_code", {
                email: signup_data.email
            })
        } catch (error) {
            logger.error("an error occurred: ", error)
            delete_user(signup_data.email)
            dispatch({
                type: SIGNUP_ERROR,
                payload: error.message
            })
        }
    }
}

export const submit_code = (code_data, navigate) => {
    logger.debug("submitting code")
    return async (dispatch) => {
        try {
            const { email, confirmationCode } = code_data;
            await Auth.confirmSignUp(email, confirmationCode, {})
            dispatch({
                type: CODE
            })
            navigate("login")
        } catch (error) {
            logger.error("an error occurred: ", error)
            dispatch({
                type: CODE_ERROR,
                payload: true
            })
        }
    }
}

export const resend_code = (email) => {
    logger.debug("re-sending code request")
    return async (dispatch) => {
        try {
            await Auth.resendSignUp(email)
        } catch (error) {
            logger.error("an error occurred: ", error)
        }
    }
}

export const forgot_password = (email, navigate) => {
    logger.debug("forgot password")
    return async (dispatch) => {
        try {
            await Auth.forgotPassword(email)
            navigate("reset_password", {
                email
            })
        } catch (error) {
            logger.error("an error occurred: ", error)
            dispatch({
                type: FORGOT_PASSWORD_ERROR,
                payload: error.message
            })
        }
    }
}

export const reset_password = (email, password, code, navigate) => {
    logger.debug("resetting password")
    return async (dispatch) => {
        try {
            await Auth.forgotPasswordSubmit(email, code, password)
            navigate("auth")
        } catch (error) {
            logger.error("an error occurred: ", error)
            dispatch({
                type: RESET_PASSWORD_ERROR,
                payload: error.message
            })
        }
    }
}
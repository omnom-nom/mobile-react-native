import { SIGNIN, SIGNUP, SIGNIN_ERROR, SIGNUP_ERROR, CODE_ERROR, CODE, FORGOT_PASSWORD_ERROR } from './types.js';

export const resetForgotPasswordErrors = () => {
    return (dispatch) => {
        dispatch({
            type: FORGOT_PASSWORD_ERROR,
            payload: ""
        })
    }
}

export const resetCodeErrors = () => {
    return (dispatch) => {
        dispatch({
            type: CODE_ERROR,
            payload: false
        })
    }
}

export const resetSignupErrors = () => {
    return (dispatch) => {
        dispatch({
            type: SIGNUP_ERROR,
            payload: ""
        })
    }
}

export const resetSigninErrors = () => {
    return (dispatch) => {
        dispatch({
            type: SIGNIN_ERROR,
            payload: ""
        })
    }
}
import { SIGNIN, SIGNUP, SIGNIN_ERROR, SIGNUP_ERROR, CODE_ERROR, CODE, FORGOT_PASSWORD_ERROR, RESET_PASSWORD_ERROR } from './types.js';
import { Auth } from 'aws-amplify';

export const check_session = (navigate) => {
    return async (dispatch) => {
        console.log("[AUTH_ACTION] check_session");
        try {
            let data = await Auth.currentSession()
            // data has all the tokens
            navigate("main")
            // dispatch({
            //     type: SESSION_EXISTS,
            //     payload: true
            // })
        } catch (error) {
            console.log(`[AUTH_ACTION] check_session : ${error}`);
            // in case of no user session
            navigate("auth")
            // dispatch({
            //     type: SESSION_EXISTS,
            //     payload: false
            // })
        }
    }
}

export const signin = (signin_data, navigate) => {
    return async (dispatch) => {
        console.log("[AUTH_ACTION] signin");
        try {
            const success_data = await Auth.signIn({
                username: signin_data.email,
                password: signin_data.password,
            })
            dispatch({
                type: SIGNIN,
            })
            navigate("main")
        } catch (error) {
            console.log(error);
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

export const signup = (signup_data, navigate) => {
    console.log(`[AUTH_ACTION] signup`);

    return async (dispatch) => {
        try {
            await Auth.signUp({
                username: signup_data.email,
                password: signup_data.password,
                attributes: { email: signup_data.email, phone_number: signup_data.phone_number },
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
            console.log(error);
            dispatch({
                type: SIGNUP_ERROR,
                payload: error.message
            })
        }
    }
}

export const submit_code = (code_data, navigate) => {
    console.log(`[AUTH_ACTION] submit code: ` + code_data.confirmationCode);
    return async (dispatch) => {
        try {
            const { email, confirmationCode } = code_data;
            await Auth.confirmSignUp(email, confirmationCode, {})
            dispatch({
                type: CODE
            })
            navigate("auth")
        } catch (error) {
            console.log(error);
            dispatch({
                type: CODE_ERROR,
                payload: true
            })
        }
    }
}

export const resend_code = (email) => {
    console.log(`[AUTH_ACTION] resending code`);
    return async (dispatch) => {
        try {
            await Auth.resendSignUp(email)
        } catch (error) {
            console.log(error);
        }
    }
}

export const forgot_password = (email, navigate) => {
    console.log(`[AUTH_ACTION] forgot password`);
    return async (dispatch) => {
        try {
            await Auth.forgotPassword(email)
            navigate("reset_password", {
                email
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: FORGOT_PASSWORD_ERROR,
                payload: error.message
            })
        }
    }
}

export const reset_password = (email, password, code, navigate) => {
    console.log(`[AUTH_ACTION] resetting password`);
    return async (dispatch) => {
        try {
            await Auth.forgotPasswordSubmit(email, code, password)
            navigate("auth")
        } catch (error) {
            console.log(error);
            dispatch({
                type: RESET_PASSWORD_ERROR,
                payload: error.message
            })
        }
    }
}

export const signout = (navigate) => {
    return async (dispatch) => {
        console.log("[AUTH_ACTION] signout");
        try {
            const success_data = await Auth.signOut()
            navigate("auth")
        } catch (error) {
            console.log(error);
        }
    }
}


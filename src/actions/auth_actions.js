import { SIGNIN, SIGNUP, SIGNIN_ERROR, SIGNUP_ERROR, CODE_ERROR, CODE, SESSION_EXISTS } from './types.js';
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
        console.log(signin_data);

        try {
            const success_data = await Auth.signIn({
                username: signin_data.email,
                password: signin_data.password,
            })
            dispatch({
                type: SIGNIN,
            })
            navigate("main")
            console.log(success_data);

        } catch (error) {
            console.log(error);
            dispatch({
                type: SIGNIN_ERROR,
                payload: error.message
            })
        }
    }
}

export const signup = (signup_data, navigate) => {
    console.log(`[AUTH_ACTION] signup`);
    console.log(signup_data);

    return async (dispatch) => {
        try {
            await Auth.signUp({
                username: signup_data.email,
                password: signup_data.password,
                attributes: { email: signup_data.email },
            })
            dispatch({
                type: SIGNUP,
                payload: {
                    email: signup_data.email,
                    name: signup_data.name,
                    phone_number: signup_data.phone_number
                }
            })
            navigate("signup_code")
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
    console.log(`[AUTH_ACTION] submit code`);
    console.log(code_data);
    return async (dispatch) => {
        try {
            const { email, confirmationCode } = code_data;
            await Auth.confirmSignUp(email, confirmationCode, {})
            dispatch({
                type: CODE
            })
            navigate("login")
        } catch (error) {
            console.log(error);
            dispatch({
                type: CODE_ERROR,
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
            navigate("login")
        } catch (error) {
            console.log(error);
        }
    }
}
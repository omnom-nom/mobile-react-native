import { RESETTING_PASSWORD, SIGNING_UP, SIGNING_IN, SIGNIN, SIGNUP, SIGNIN_ERROR, SIGNUP_ERROR, CODE_ERROR, CODE, SESSION_EXISTS, FORGOT_PASSWORD_ERROR, RESET_PASSWORD_ERROR, RESET } from '../actions/types.js';
import { loggerConfig } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify';
const initialState = {
  signing_in: false,
  signing_up: false,
  resetting_password: false,
  signin_error: ""
}
const logger = new Logger("[AuthReducer]", loggerConfig.level)
export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION_EXISTS:
      logger.debug("SESSION_EXISTS ");
      return { ...state, session_exists: action.payload }
    case SIGNIN:
      logger.debug("SIGNIN ");
      return { ...state, signin_error: "" }
    case SIGNIN_ERROR:
      logger.debug("SIGNIN_ERROR ");
      return { ...state, signin_error: action.payload }
    case SIGNUP_ERROR:
      logger.debug("SIGNUP_ERROR ");
      return { ...state, signup_error: action.payload }
    case SIGNUP:
      logger.debug("SIGNUP ");
      return { ...state, ...action.payload, signup_error: "" }
    case CODE_ERROR:
      logger.debug("CODE_ERROR ");
      return { ...state, code_error: action.payload }
    case CODE:
      logger.debug("CODE ");
      return { ...state, code_error: "" }
    case FORGOT_PASSWORD_ERROR:
      logger.debug("FORGOT_PASSWORD_ERROR ");
      return { ...state, forgot_password_error: action.payload }
    case RESET_PASSWORD_ERROR:
      logger.debug("RESET_PASSWORD_ERROR ");
      return { ...state, reset_password_error: action.payload }
    case SIGNING_IN:
      logger.debug("SIGNING_IN ");
      return { ...state, signing_in: action.payload }
    case SIGNING_UP:
      logger.debug("SIGNING_UP ");
      return { ...state, signing_up: action.payload }
    case RESETTING_PASSWORD:
      logger.debug("RESETTING_PASSWORD ");
      return { ...state, resetting_password: action.payload }
    case RESET:
      logger.debug("RESET_PASSWORD_ERROR ");
      return {}
    default:
      return state
  }
};

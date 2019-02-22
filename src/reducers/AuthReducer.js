import { SIGNIN, SIGNUP, SIGNIN_ERROR, SIGNUP_ERROR, CODE_ERROR, CODE, SESSION_EXISTS } from '../actions/types.js';

const initialState = {

}

export default (state = initialState, action) => {
  console.log(action.payload);

  switch (action.type) {
    case SESSION_EXISTS:
      console.log("AuthReducer SESSION_EXISTS ");
      console.log({ ...state, session_exists: action.payload });
      return { ...state, session_exists: action.payload }
    case SIGNIN:
      console.log("AuthReducer SIGNIN ");
      console.log({ ...state, signin_error: "" });
      return { ...state, signin_error: "" }
    case SIGNIN_ERROR:
      console.log("AuthReducer SIGNIN_ERROR ");
      console.log({ ...state, signin_error: action.payload });
      return { ...state, signin_error: action.payload }
    case SIGNUP_ERROR:
      return { ...state, signup_error: action.payload }
    case SIGNUP:
      console.log("AuthReducer SIGNUP ");
      console.log({ ...state, ...action.payload, signup_error: "" });
      return { ...state, ...action.payload, signup_error: "" }
    case CODE_ERROR:
      console.log("AuthReducer CODE_ERROR ");
      console.log({ ...state, code_error: action.payload });
      return { ...state, code_error: action.payload }
    case CODE:
      console.log("AuthReducer CODE_ERROR ");
      console.log({ ...state, code_error: "" });
      return { ...state, code_error: "" }

    default:
      return state
  }
};

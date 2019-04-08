import { CUSTOMER_TYPE } from '../actions/types.js';

const initialState = {

}

export default (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_TYPE:
            console.log("[CustomerInfoReducer] CUSTOMER_TYPE ");
            console.log({ ...state, session_exists: action.payload });
            return { ...state, customer_type: action.payload }
        default:
            return state
    }
};

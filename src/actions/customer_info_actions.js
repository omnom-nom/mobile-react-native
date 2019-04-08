
import { CUSTOMER_TYPE } from './types.js';

export const customerTypeSelection = (customer_type, navigate) => {
    console.log(`[CUSTOMER_INFO] customer type: ` + customer_type);
    return (dispatch) => {
        dispatch({
            type: CUSTOMER_TYPE,
            payload: customer_type
        })
        navigate("signup")
    }
}
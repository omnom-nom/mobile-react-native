import { getSecret } from '../apis/aws'
export const starting_action = (dispatch, type) => { dispatch({ type, payload: true }) }
export const ending_action = (dispatch, type) => { dispatch({ type, payload: false }) }
export const fetch_api_key = async (dispatch, secret_name, type) => {
    const api_key = await getSecret(secret_name)
    dispatch({
        type: type,
        payload: api_key
    })
}

import { CUSTOMER_TYPE, CUSTOMER_DELIVERY_LOCATION, GOOGLE_PLACES_API_SESSION_TOKEN, CUSTOMER_ADDRESSES } from './types.js';
import { MapView, Location, Permissions, Constants } from 'expo'
import uuidv4 from 'uuid/v4'
import { Logger } from 'aws-amplify'
import { loggerConfig } from '../cmn/AppConfig'
import { store } from '../store'
import _ from 'lodash'

logger = new Logger("[CustomerAction]", loggerConfig.level)

export const customerTypeSelection = (customer_type, navigate) => {
    logger.debug("setting customer type: ", customer_type)
    return (dispatch) => {
        dispatch({
            type: CUSTOMER_TYPE,
            payload: customer_type
        })
        navigate("signup_customer")
    }
}

export const customerCurrentLocationCoordinate = (location) => {
    logger.debug("customer delivery locaiton: ", location)
    return async (dispatch, getState) => {
        const { google_places_api_key } = getState().api_keys
        const address = await getCustomerDeliveryLocation(location.latitude, location.longitude, google_places_api_key)
        dispatch({
            type: CUSTOMER_DELIVERY_LOCATION,
            payload: address
        })
    }
}

export const updateCustomerDeliveryLocation = (address) => {
    logger.debug("updating customer delivery locaiton ")
    return (dispatch) => {
        dispatch({
            type: CUSTOMER_DELIVERY_LOCATION,
            payload: address
        })
    }
}

export const customerCurrentLocation = () => {
    logger.debug("setting customer current locaiton")
    return async (dispatch) => {
        let delivery_location_coordinates = null
        const location = await getLocationAsync()
        if (location === null) {
            delivery_location_coordinates = {
                latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0, longitudeDelta: 0, update: true
            }
        } else {
            delivery_location_coordinates = {
                update: true,
                latitude: Number(location.coords.latitude),
                longitude: Number(location.coords.longitude),
                latitudeDelta: Number(0.0922),
                longitudeDelta: Number(0.0421)
            }
        }
        dispatch({
            type: CUSTOMER_DELIVERY_LOCATION,
            payload: delivery_location_coordinates
        })
    }
}

export const createSessionTokenForGooglePlaceApi = () => {
    return (dispatch) => {
        session_token = uuidv4()
        logger.debug(`google place api session key rotated ${session_token}`);
        dispatch({
            type: GOOGLE_PLACES_API_SESSION_TOKEN,
            payload: session_token
        })
    }
}

export const autocompleteAddress = (address_string) => {
    return async (dispatch, getState) => {
        const { google_places_session_token } = getState().session_tokens
        const { google_places_api_key } = getState().api_keys
        addresses = await autoCompleteAddress(address_string, google_places_session_token, google_places_api_key)
        dispatch({
            type: CUSTOMER_ADDRESSES,
            payload: addresses
        })
    }
}

// TODO: Possiblly move the google apis to a server on aws and use that

export const selectAddress = (place_id) => {
    logger.debug("customer selected an address")
    return async (dispatch, getState) => {
        const { google_places_session_token } = getState().session_tokens
        const { google_places_api_key } = getState().api_keys
        const address = await fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place_id + '&key=' + google_places_api_key + '&sessiontoken=' + google_places_session_token)
        const addressJson = await address.json()
    }
}

getCustomerDeliveryLocation = async (lat, lon, api_key) => {
    logger.debug("getting customer delivery locatino");
    try {
        const address = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lon + '&key=' + api_key)
        const addressJson = await address.json()
        return convertoResultToAddress(addressJson)
    } catch (error) {
        logger.error("an error occured ", error)
        // TODO: what if there is an error here. 
        // Show nothing maybe
    }
}

convertoResultToAddress = (address) => {
    components = address["results"][0]["address_components"]
    street_number = components.filter((c) => c["types"][0] === "street_number")[0]
    route = components.filter((c) => c["types"][0] === "route")[0]
    return `${street_number["short_name"]} ${route["short_name"]}`
}

autoCompleteAddress = async (query_address, session_token, api_key) => {
    logger.debug("getting address list")
    try {
        const address = await fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + query_address + '&key=' + api_key + '&sessiontoken=' + session_token)
        const addressJson = await address.json()
        return _.transform(addressJson["predictions"], function (result, n) {
            result.push({
                description: n["description"],
                place_id: n["place_id"],
            })
        }, [])
    } catch (error) {
        logger.error("an error occured ", error)
        // TODO: what if there is an error here. 
    }
}

getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        return {
            latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0, longitudeDelta: 0
        }
    }
    let location = await Location.getCurrentPositionAsync({});
    return location
};

import { FETCHING_MERCHANTS, CUSTOMER_TYPE, CUSTOMER_DELIVERY_LOCATION, GOOGLE_PLACES_API_SESSION_TOKEN, CUSTOMER_ADDRESSES, ORDER_DELIVERY_ADDRESS, MERCHANTS } from './types.js';
import { Location, Permissions } from 'expo'
import uuidv4 from 'uuid/v4'
import { Logger } from 'aws-amplify'
import { loggerConfig } from '../cmn/AppConfig'
import { starting_action, ending_action, fetch_api_key } from './cmn'
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
        updateGoogleApiSessionToken(dispatch)
    }
}

const updateGoogleApiSessionToken = (dispatch) => {
    session_token = uuidv4()
    logger.debug(`google place api session key rotated ${session_token}`);
    dispatch({
        type: GOOGLE_PLACES_API_SESSION_TOKEN,
        payload: session_token
    })
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

export const selectAddress = (place_id, navigate) => {
    logger.debug("customer selected an address 1")
    return async (dispatch, getState) => {
        try {
            starting_action(dispatch, FETCHING_MERCHANTS)
            const { google_places_session_token } = getState().session_tokens
            const { google_places_api_key } = getState().api_keys
            const address = await fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place_id + '&key=' + google_places_api_key + '&sessiontoken=' + google_places_session_token)
            const addressJson = await address.json()
            logger.debug(addressJson["result"]["address_components"])
            const finalDeliveryAddress = getDeliveryAddress(addressJson)
            await dispatch({
                type: ORDER_DELIVERY_ADDRESS,
                payload: finalDeliveryAddress
            })
            navigate("customer_main")
            await sleep(2000)
            // TODO: get the merchants info using apis
            ending_action(dispatch, FETCHING_MERCHANTS)
            await dispatch({
                type: MERCHANTS,
                payload: merchants_summary.merchants
            })
            updateGoogleApiSessionToken(dispatch)
        } catch (error) {
            logger.error("unable to fetch detailed info for place id: ", place_id, error)
            ending_action(dispatch, FETCHING_MERCHANTS)
        }
    }
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

getDeliveryAddress = (addressJson) => {
    const components = addressJson["result"]["address_components"]
    street_number = components.filter((c) => c["types"][0] === "street_number")
    street_name = components.filter((c) => c["types"][0] === "route")
    city = components.filter((c) => c["types"][0] === "locality")
    postal_code = components.filter((c) => c["types"][0] === "postal_code")
    return {
        street_number: _.isUndefined(street_number) || _.isEmpty(street_number) ? null : street_number[0]["long_name"],
        street_name: _.isUndefined(street_name) || _.isEmpty(street_name) ? null : street_name[0]["long_name"],
        city: _.isUndefined(city) || _.isEmpty(city) ? null : city[0]["long_name"],
        postal_code: _.isUndefined(postal_code) || _.isEmpty(postal_code) ? null : postal_code[0]["long_name"],
    }
}

getCustomerDeliveryLocation = async (lat, lon, api_key) => {
    logger.debug("getting customer delivery location");
    try {
        const address = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lon + '&key=' + api_key)
        const addressJson = await address.json()
        return convertoResultToAddress(addressJson)
    } catch (error) {
        logger.error("an error occurred ", error)
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
        logger.error("an error occurred ", error)
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


const merchants_summary = {
    merchants: [
        {
            "id": "3aa25d0b-456c-4bbf-91be-3a5cd394ee00",
            "name": "Dosaz",
            "cuisine": "Indian",
            "short_description": "",
            "images": [
                "https://static01.nyt.com/images/2015/01/28/dining/28KITCHEN1/28KITCHEN1-articleLarge.jpg",
                "https://c.ndtvimg.com/3jbsmmp_dosa_625x300_30_August_18.jpg"
            ],
            "reviews": {
                "rating": "4.5",
                "total": "300",
                "top5": [
                    {
                        "rating": "4.9",
                        "comment": "Good food",
                        "date": "04/20/2019"
                    },
                    {
                        "rating": "4.9",
                        "comment": "Bland food",
                        "date": "04/20/2019"
                    }
                ]
            },
            "price": "15"
        },
        {
            "id": "58b35622-1bb1-4b1c-ba5b-8e727da9a6de",
            "name": "My Little Kitchin",
            "cuisine": "Chinese",
            "short_description": "",
            "images": [
                "https://www.tarladalal.com/members/9306/big/big_aloo_paratha-7707.jpg",
                "http://www.spoonforkandfood.com/wp-content/uploads/2015/08/aloo-paratha-stuffed-whole-wheat-indian-flat-bread.1024x1024.jpg",
                "https://c8.alamy.com/comp/J21CDY/indian-typical-stainless-steel-lunch-box-or-tiffin-with-north-indian-J21CDY.jpg"
            ],
            "reviews": {
                "rating": "4.5",
                "total": "23",
                "top5": [
                    {
                        "rating": "4.9",
                        "comment": "Good food",
                        "date": "04/20/2019"
                    },
                    {
                        "rating": "4.9",
                        "comment": "Spicy food",
                        "date": "04/20/2019"
                    }
                ]
            },
            "price": "10"
        },
        {
            "id": "58b35622-1bb1-4b1c-ba5b-2345",
            "name": "Home Kitchin",
            "cuisine": "Chinese",
            "short_description": "",
            "images": [
                "https://www.tarladalal.com/members/9306/big/big_aloo_paratha-7707.jpg",
                "http://www.spoonforkandfood.com/wp-content/uploads/2015/08/aloo-paratha-stuffed-whole-wheat-indian-flat-bread.1024x1024.jpg",
                "https://c8.alamy.com/comp/J21CDY/indian-typical-stainless-steel-lunch-box-or-tiffin-with-north-indian-J21CDY.jpg"
            ],
            "reviews": {
                "rating": "4.5",
                "total": "23",
                "top5": [
                    {
                        "rating": "4.9",
                        "comment": "Good food",
                        "date": "04/20/2019"
                    },
                    {
                        "rating": "4.9",
                        "comment": "Spicy food",
                        "date": "04/20/2019"
                    }
                ]
            },
            "price": "12.45"
        }
    ]
}
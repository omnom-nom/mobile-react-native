
import { REMOVE_FROM_CART, ADD_TO_CART, DELETE_FROM_CART, MERCHANT_CURRENT, DISH_CURRENT } from './types.js';
import { Logger } from 'aws-amplify'
import { loggerConfig } from '../cmn/AppConfig'
import { store } from '../store'
import _ from 'lodash'

logger = new Logger("[OrderAction]", loggerConfig.level)

export const addToCart = (item) => {
    logger.debug("adding item to cart ", item.id)
    return (dispatch) => {
        dispatch({
            type: ADD_TO_CART,
            payload: item
        })
    }
}

export const removeFromCart = (item) => {
    logger.debug("removing item from cart ", item.id)
    return (dispatch) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: item
        })
    }
}

export const deleteFromCart = (item) => {
    logger.debug("deleting item from cart ", item.id)
    return (dispatch) => {
        dispatch({
            type: DELETE_FROM_CART,
            payload: item
        })
    }
}

export const currentCook = (cook_id) => {
    logger.debug("updating current cook ", cook_id)
    // TODO get the entire cook information and dispatch that as payload
    curr_cook = _.filter(merchants_detail.merchants, (c) => {
        return c.id == cook_id
    })[0]
    return (dispatch) => {
        dispatch({
            type: MERCHANT_CURRENT,
            payload: curr_cook
        })
    }
}

export const currentDish = (dish) => {
    logger.debug("updating current dish ", dish)
    // TODO get the entire dish information and dispatch that as payload
    curr_dish = _.filter(dish_details.items, (i) => {
        return i.id == dish.id
    })[0]
    return (dispatch) => {
        dispatch({
            type: DISH_CURRENT,
            payload: curr_dish
        })
    }
}

dish_details = {
    items: [
        {
            "cook": "3aa25d0b-456c-4bbf-91be-3a5cd394ee00",
            "id": "1",
            "name": "Masala Dosa",
            "price": "7",
            "images": [
                "https://static01.nyt.com/images/2015/01/28/dining/28KITCHEN1/28KITCHEN1-articleLarge.jpg",
                "https://c.ndtvimg.com/3jbsmmp_dosa_625x300_30_August_18.jpg",
                "https://www.tarladalal.com/members/9306/big/big_aloo_paratha-7707.jpg"
            ],
            "description": "A properly made crisp and savory Indian dosa is wonderfully delicious, and fairly simple to make at home, with this caveat: the batter must be fermented overnight for the correct texture and requisite sour flavor. ",
            "tags": [
                "Contains nuts",
                "Gluten free",
                "Vegan"
            ],
            "content": [
                {
                    "name": "Masala Dosa Masala Dosa Masala Dosa",
                    "count": "1"
                },
                {
                    "name": "Coconut Chutni",
                    "count": "1"
                },
                {
                    "name": "Tomato Chutni",
                    "count": "1"
                }
            ]
        },
        {
            "cook": "3aa25d0b-456c-4bbf-91be-3a5cd394ee00",
            "id": "2",
            "name": "Onion Dosa",
            "price": "7",
            "images": [
                "https://c.ndtvimg.com/3jbsmmp_dosa_625x300_30_August_18.jpg"
            ],
            "description": "A properly made crisp and savory Indian dosa is wonderfully delicious, and fairly simple to make at home, with this caveat: the batter must be fermented overnight for the correct texture and requisite sour flavor. ",
            "tags": [
                "Contains nuts",
                "Gluten free",
                "vegan"
            ],
            "content": [
                {
                    "name": "Onion Dosa",
                    "count": "1"
                },
                {
                    "name": "Coconut Chutni",
                    "count": "1"
                },
                {
                    "name": "Tomato Chutni",
                    "count": "1"
                }
            ]
        },
        {
            "cook": "58b35622-1bb1-4b1c-ba5b-8e727da9a6de",
            "id": "3",
            "name": "Aloo paratha",
            "price": "3",
            "images": [
                "https://www.tarladalal.com/members/9306/big/big_aloo_paratha-7707.jpg"
            ],
            "description": "Aloo parathas consist of unleavened dough stuffed with a mixture of mashed potato and spices, which is rolled out and cooked on a hot tawa with butter or ghee. Aloo paratha is usually served with butter, chutney, or Indian pickles in different parts of northern and western India.",
            "tags": [
                "Contains nuts"
            ],
            "content": [
                {
                    "name": "Aloo Paratha",
                    "count": "2"
                },
                {
                    "name": "Small Yogurt",
                    "count": "1"
                },
                {
                    "name": "Pickle",
                    "count": "1"
                }
            ]
        },
        {
            "cook": "58b35622-1bb1-4b1c-ba5b-8e727da9a6de",
            "id": "4",
            "name": "Paneer paratha",
            "price": "3",
            "images": [
                "http://www.spoonforkandfood.com/wp-content/uploads/2015/08/aloo-paratha-stuffed-whole-wheat-indian-flat-bread.1024x1024.jpg"
            ],
            "description": "Aloo parathas consist of unleavened dough stuffed with a mixture of mashed potato and spices, which is rolled out and cooked on a hot tawa with butter or ghee. Aloo paratha is usually served with butter, chutney, or Indian pickles in different parts of northern and western India.",
            "tags": [
                "Contains nuts"
            ],
            "content": [
                {
                    "name": "Paneer Paratha",
                    "count": "2"
                },
                {
                    "name": "Small Yogurt",
                    "count": "1"
                },
                {
                    "name": "Pickle",
                    "count": "1"
                }
            ]
        },
        {
            "cook": "58b35622-1bb1-4b1c-ba5b-8e727da9a6de",
            "id": "5",
            "name": "Noth Indian Lunch Box Box Box",
            "price": "12",
            "images": [
                "https://c8.alamy.com/comp/J21CDY/indian-typical-stainless-steel-lunch-box-or-tiffin-with-north-indian-J21CDY.jpg"
            ],
            "description": "Aloo parathas consist of unleavened dough stuffed with a mixture of mashed potato and spices, which is rolled out and cooked on a hot tawa with butter or ghee. Aloo paratha is usually served with butter, chutney, or Indian pickles in different parts of northern and western India.",
            "tags": [
            ],
            "content": [
                {
                    "name": "Roti",
                    "count": "2"
                },
                {
                    "name": "Rice",
                    "count": "1"
                },
                {
                    "name": "Dal Makhani",
                    "count": "1"
                },
                {
                    "name": "Vegitable Curry",
                    "count": "1"
                },
                {
                    "name": "Sweet",
                    "count": "1"
                }
            ]
        }
    ]
}

merchants_detail = {
    "merchants": [
        {
            "id": "3aa25d0b-456c-4bbf-91be-3a5cd394ee00",
            "name": "Dosaz",
            "cuisine": "Indian",
            "short_description": "We combine flavorful, authentic dishes with a seasonal, local sensibility to bring a fresh take on Indian cuisine that respects it boldness and diversity",
            "images": [
                "https://static01.nyt.com/images/2015/01/28/dining/28KITCHEN1/28KITCHEN1-articleLarge.jpg",
                "https://c.ndtvimg.com/3jbsmmp_dosa_625x300_30_August_18.jpg"
            ],
            "items": [
                {
                    "id": "1",
                    "name": "Masala Dosa",
                    "images": [
                        "https://static01.nyt.com/images/2015/01/28/dining/28KITCHEN1/28KITCHEN1-articleLarge.jpg",
                    ],
                    "description": "A properly made crisp and savory Indian dosa is wonderfully delicious, and fairly simple to make at home, with this caveat: the batter must be fermented overnight for the correct texture and requisite sour flavor. ",
                    "tags": [
                        "Contains nuts",
                        "Gluten free",
                        "vegan"
                    ],
                    "content": [
                        {
                            "Masala Dosa": "1"
                        },
                        {
                            "Coconut Chutni": "1"
                        },
                        {
                            "Tomato Chutni": "1"
                        }
                    ]
                },
                {
                    "id": "2",
                    "name": "Onion Dosa",
                    "images": [
                        "https://c.ndtvimg.com/3jbsmmp_dosa_625x300_30_August_18.jpg"
                    ],
                    "description": "A properly made crisp and savory Indian dosa is wonderfully delicious, and fairly simple to make at home, with this caveat: the batter must be fermented overnight for the correct texture and requisite sour flavor. ",
                    "tags": [
                        "Contains nuts",
                        "Gluten free",
                        "vegan"
                    ],
                    "content": [
                        {
                            "Masala Dosa": "1"
                        },
                        {
                            "Coconut Chutni": "1"
                        },
                        {
                            "Tomato Chutni": "1"
                        }
                    ]
                }
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
            }
        },
        {
            "id": "58b35622-1bb1-4b1c-ba5b-8e727da9a6de",
            "name": "My Little Kitchin",
            "cuisine": "Indian",
            "short_description": "",
            "images": [
                "https://www.tarladalal.com/members/9306/big/big_aloo_paratha-7707.jpg",
                "http://www.spoonforkandfood.com/wp-content/uploads/2015/08/aloo-paratha-stuffed-whole-wheat-indian-flat-bread.1024x1024.jpg",
                "https://c8.alamy.com/comp/J21CDY/indian-typical-stainless-steel-lunch-box-or-tiffin-with-north-indian-J21CDY.jpg"
            ],
            "items": [
                {
                    "id": "3",
                    "name": "Aloo paratha",
                    "images": [
                        "https://www.tarladalal.com/members/9306/big/big_aloo_paratha-7707.jpg"
                    ],
                    "description": "Aloo parathas consist of unleavened dough stuffed with a mixture of mashed potato and spices, which is rolled out and cooked on a hot tawa with butter or ghee. Aloo paratha is usually served with butter, chutney, or Indian pickles in different parts of northern and western India.",
                    "tags": [
                        "Contains nuts"
                    ],
                    "content": [
                        {
                            "Aloo Paratha": "2"
                        },
                        {
                            "Small Yogurt": "1"
                        },
                        {
                            "Pickle": "1"
                        }
                    ]
                },
                {
                    "id": "4",
                    "name": "Paneer paratha",
                    "images": [
                        "http://www.spoonforkandfood.com/wp-content/uploads/2015/08/aloo-paratha-stuffed-whole-wheat-indian-flat-bread.1024x1024.jpg"
                    ],
                    "description": "Aloo parathas consist of unleavened dough stuffed with a mixture of mashed potato and spices, which is rolled out and cooked on a hot tawa with butter or ghee. Aloo paratha is usually served with butter, chutney, or Indian pickles in different parts of northern and western India.",
                    "tags": [
                        "Contains nuts"
                    ],
                    "content": [
                        {
                            "Aloo Paratha": "2"
                        },
                        {
                            "Small Yogurt": "1"
                        },
                        {
                            "Pickle": "1"
                        }
                    ]
                },
                {
                    "id": "5",
                    "name": "Noth Indian Lunch Box",
                    "images": [
                        "https://c8.alamy.com/comp/J21CDY/indian-typical-stainless-steel-lunch-box-or-tiffin-with-north-indian-J21CDY.jpg"
                    ],
                    "description": "Aloo parathas consist of unleavened dough stuffed with a mixture of mashed potato and spices, which is rolled out and cooked on a hot tawa with butter or ghee. Aloo paratha is usually served with butter, chutney, or Indian pickles in different parts of northern and western India.",
                    "tags": [
                    ],
                    "content": [
                        {
                            "Roti": "2"
                        },
                        {
                            "Rice": "1"
                        },
                        {
                            "Dal Makhani": "1"
                        },
                        {
                            "Vegitable Curry": "1"
                        },
                        {
                            "Sweet": "1"
                        }
                    ]
                }
            ],
            "reviews": {
                "rating": "0",
                "total": "100",
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
            }
        }
    ]
}

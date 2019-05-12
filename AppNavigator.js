import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { moderateScale, width, verticalScale, height } from './src/cmn/Scaling';
import { colors, style } from './src/cmn/AppConfig';
import { Icon } from 'react-native-elements';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/signup/SignupScreen';
import CodeScreen from './src/screens/auth/signup/CodeScreen';
import LoadScreen from './src/screens/LoadScreen';
import CustomerTypeScreen from './src/screens/auth/signup/CustomerTypeScreen';
import EmailInput from './src/screens/auth/forgot_password/EmailInput';
import ResetPasswordScreen from './src/screens/auth/forgot_password/ResetPasswordScreen';
import LocationScreen from './src/screens/customer/LocationScreen';
import MenuScreen from './src/screens/customer/MenuScreen';
import CookScreen from './src/screens/customer/CookScreen';
import DishScreen from './src/screens/customer/DishScreen';
import CartScreen from './src/screens/customer/CartScreen';
import OrdersScreen from './src/screens/customer/OrdersScreen';
import AccountScreen from './src/screens/account/AccountScreen';
import PersonalInformationScreen from './src/screens/account/PersonalInformationScreen';
import CheckoutScreen from './src/screens/customer/CheckoutScreen';
import BottomTabBarIcon from './src/components/BottomTabBarIcon';
import { connect } from 'react-redux';
import DishScreenNew from './src/screens/customer/DishScreenNew';
import CookMenuScreen from './src/screens/cook/CookMenuScreen';
import MainScreen from './src/screens/cook/MainScreen';
import ReviewsScreen from './src/screens/cook/ReviewsScreen';
import EarningsScreen from './src/screens/cook/EarningsScreen';
import OngoingOrdersScreen from './src/screens/cook/OngoingOrdersScreen';
import AcceptedOrdersScreen from './src/screens/cook/AcceptedOrders';
import NewOrdersScreen from './src/screens/cook/NewOrdersScreen';
import NewDishScreen from './src/screens/cook/NewDishScreen';
import AllDishesScreen from './src/screens/cook/AllDishesScreen';
import DishPreviewScreen from './src/screens/cook/DishPreviewScreen';


const nullHeader = {
    header: null
}

const SignupStack = createStackNavigator({
    signup_customer_type: {
        screen: CustomerTypeScreen,
        navigationOptions: nullHeader
    },
    signup_customer: {
        screen: SignupScreen,
        navigationOptions: nullHeader
    },
    signup_code: {
        screen: CodeScreen,
        navigationOptions: nullHeader
    },
})

const ResetPasswordStack = createStackNavigator({
    forgot_password_email_input: {
        screen: EmailInput,
        navigationOptions: nullHeader
    },
    reset_password: {
        screen: ResetPasswordScreen,
        navigationOptions: nullHeader
    }
})

const AuthStack = createStackNavigator({
    login: {
        screen: LoginScreen,
        navigationOptions: nullHeader
    },
    signin_code: {
        screen: CodeScreen,
        navigationOptions: nullHeader
    },
    signup: {
        screen: SignupStack,
        navigationOptions: nullHeader
    },
    reset_password: {
        screen: ResetPasswordStack,
        navigationOptions: nullHeader
    },
})

const AccountStack = createStackNavigator({
    account: {
        screen: AccountScreen,
        navigationOptions: nullHeader
    },
    acc_info: {
        screen: PersonalInformationScreen,
        navigationOptions: nullHeader
    }
})

const CheckoutStack = createStackNavigator(
    {
        cart: {
            screen: CartScreen,
        },
        checkout: {
            screen: CheckoutScreen,
        },
    },
    {
        initialRouteName: 'cart',
        mode: 'modal',
        headerMode: 'none',
    }
)

const FoodStack = createStackNavigator(
    {
        food: {
            screen: MenuScreen,
            navigationOptions: nullHeader
        },
        cook: {
            screen: CookScreen,
            navigationOptions: nullHeader
        },
        dish: {
            screen: DishScreenNew,
            navigationOptions: nullHeader
        },
    },
    {
        initialRouteName: 'food',
    }
)

const CustomerMainStack = createBottomTabNavigator(
    {
        food: {
            screen: FoodStack,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => tabBarIcon(focused, tintColor, "food-fork-drink"),
                tabBarLabel: "Food"
            }
        },
        cart: {
            screen: CheckoutStack,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => (
                    <BottomTabBarIcon color={tintColor} focused={focused} />
                ),
                tabBarLabel: "Cart"
            }
        },
        orders: {
            screen: OrdersScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => tabBarIcon(focused, tintColor, "briefcase-outline"),
                tabBarLabel: "Orders"
            }
        },
        account: {
            screen: AccountStack,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => tabBarIcon(focused, tintColor, "account-outline"),
                tabBarLabel: "Account"
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: colors.radicalRed,
            inactiveTintColor: iOSColors.gray,
            style: {
                height: verticalScale(50),
                backgroundColor: style.backgroundColor()
            }
        }
    }
)

tabBarIcon = (focused, tintColor, name) => {
    let containerStyle = {}
    if (focused) {
        containerStyle = style.shadow(colors.radicalRed)
    }
    return (
        <Icon
            name={name}
            type="material-community"
            size={moderateScale(20)}
            color={tintColor}
            containerStyle={containerStyle}
        />
    )
}

const CustomerStack = createStackNavigator(
    {
        delivery_location: {
            screen: LocationScreen,
            navigationOptions: nullHeader
        },
        customer_main: {
            screen: CustomerMainStack,
            navigationOptions: nullHeader
        }
    },
    {
        initialRouteName: 'delivery_location',
        headerMode: 'none',
    }
)

const CookMenuStack = createStackNavigator(
    {
        menu: {
            screen: CookMenuScreen,
        },
        preview: {
            screen: DishPreviewScreen
        },
        new_dish: {
            screen: NewDishScreen,
        },
        all_dishes: {
            screen: AllDishesScreen,
        }
    },
    {
        initialRouteName: 'menu',
        mode: 'modal',
        headerMode: 'none',
    }
)

const CookHome = createStackNavigator(
    {
        main: {
            screen: MainScreen,
            navigationOptions: nullHeader
        },
        review: {
            screen: ReviewsScreen,
            navigationOptions: nullHeader
        },
        earnings: {
            screen: EarningsScreen,
            navigationOptions: nullHeader
        },
        new_orders: {
            screen: NewOrdersScreen,
            navigationOptions: nullHeader
        },
        accepted_orders: {
            screen: AcceptedOrdersScreen,
            navigationOptions: nullHeader
        },
        ongoing_orders: {
            screen: OngoingOrdersScreen,
            navigationOptions: nullHeader
        },
        menu: {
            screen: CookMenuStack,
            navigationOptions: nullHeader
        }
    },
    {
        initialRouteName: 'main',
    }
)

const CookStack = createBottomTabNavigator(
    {
        cook_home: {
            screen: CookHome,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => tabBarIcon(focused, tintColor, "home-outline"),
                tabBarLabel: "Home"
            }
        },
        account: {
            screen: AccountStack,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => tabBarIcon(focused, tintColor, "account-outline"),
                tabBarLabel: "Account"
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: colors.radicalRed,
            inactiveTintColor: iOSColors.gray,
            style: {
                height: verticalScale(50),
                backgroundColor: style.backgroundColor()
            }
        }
    }
)

const AppNavigator = createSwitchNavigator(
    {
        auth_load: {
            screen: LoadScreen,
            navigationOptions: nullHeader
        },
        auth: {
            screen: AuthStack,
            navigationOptions: nullHeader
        },
        customer: {
            screen: CustomerStack,
            navigationOptions: nullHeader
        },
        cook: {
            screen: CookStack,
            navigationOptions: nullHeader
        },
    },
    {
        initialRouteName: 'auth_load',
    }
);

export default createAppContainer(AppNavigator);
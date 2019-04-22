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


const nullHeader = {
    header: null
}

const AuthStack = createStackNavigator({
    login: {
        screen: LoginScreen,
        navigationOptions: nullHeader
    },
    signin_code: {
        screen: CodeScreen,
        navigationOptions: nullHeader
    },
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
    forgot_password_email_input: {
        screen: EmailInput,
        navigationOptions: nullHeader
    },
    reset_password: {
        screen: ResetPasswordScreen,
        navigationOptions: nullHeader
    }
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
            navigationOptions: nullHeader
        },
        checkout: {
            screen: CheckoutScreen,
            navigationOptions: nullHeader
        },
    },
    {
        initialRouteName: 'cart',
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
        initialRouteName: 'customer_main',
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
    },
    {
        initialRouteName: 'customer',
    }
);

export default createAppContainer(AppNavigator);
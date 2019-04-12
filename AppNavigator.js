import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/signup/SignupScreen';
import CodeScreen from './src/screens/auth/signup/CodeScreen';
import LoadScreen from './src/screens/LoadScreen';
import CustomerTypeScreen from './src/screens/auth/signup/CustomerTypeScreen';
import EmailInput from './src/screens/auth/forgot_password/EmailInput';
import ResetPasswordScreen from './src/screens/auth/forgot_password/ResetPasswordScreen';
import LocationScreen from './src/screens/customer/LocationScreen';
import MenuScreen from './src/screens/customer/MenuScreen';

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

const CustomerStack = createStackNavigator({
    delivery_location: {
        screen: LocationScreen,
        navigationOptions: nullHeader
    },
    menu: {
        screen: MenuScreen,
        navigationOptions: nullHeader
    }
})

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
        initialRouteName: 'auth_load',
    }
);

export default createAppContainer(AppNavigator);
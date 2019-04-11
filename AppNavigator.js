import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/signup/SignupScreen';
import CodeScreen from './src/screens/signup/CodeScreen';
import LoadScreen from './src/screens/LoadScreen';
import CustomerTypeScreen from './src/screens/signup/CustomerTypeScreen';
import EmailInput from './src/screens/forgot_password/EmailInput';
import ResetPasswordScreen from './src/screens/forgot_password/ResetPasswordScreen';
import LocationScreen from './src/screens/customer/LocationScreen';



const AuthStack = createStackNavigator({
    login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    signin_code: {
        screen: CodeScreen,
        navigationOptions: {
            header: null
        }
    },
    signup_customer_type: {
        screen: CustomerTypeScreen,
        navigationOptions: {
            header: null
        }
    },
    signup_customer: {
        screen: SignupScreen,
        navigationOptions: {
            header: null
        }
    },
    signup_code: {
        screen: CodeScreen,
        navigationOptions: {
            header: null
        }
    },
    forgot_password_email_input: {
        screen: EmailInput,
        navigationOptions: {
            header: null
        }
    },
    reset_password: {
        screen: ResetPasswordScreen,
        navigationOptions: {
            header: null
        }
    }
})

const CustomerStack = createStackNavigator({
    customer_location: {
        screen: LocationScreen,
        navigationOptions: {
            header: null
        }
    }
})

const AppNavigator = createSwitchNavigator(
    {
        auth_load: {
            screen: LoadScreen,
            navigationOptions: {
                header: null
            }
        },
        auth: {
            screen: AuthStack,
            navigationOptions: {
                header: null
            }
        },
        main: {
            screen: CustomerStack,
            navigationOptions: {
                header: null
            }
        },
    },
    {
        // initialRouteName: 'main',
        initialRouteName: 'auth_load',
    }
);

export default createAppContainer(AppNavigator);
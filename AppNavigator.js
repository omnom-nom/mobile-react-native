import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/signup/SignupScreen';
import CodeScreen from './src/screens/signup/CodeScreen';
import LoadScreen from './src/screens/LoadScreen';
import CustomerTypeScreen from './src/screens/signup/CustomerTypeScreen';
import EmailInput from './src/screens/forgot_password/EmailInput';
import ResetPasswordScreen from './src/screens/forgot_password/ResetPasswordScreen';



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
})

const SignupStack = createStackNavigator({
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
})

const PasswordResetStack = createStackNavigator({
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

const AppNavigator = createStackNavigator({
    load: {
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
        screen: MainScreen,
        navigationOptions: {
            header: null
        }
    },
    password_reset: {
        screen: PasswordResetStack,
        navigationOptions: {
            header: null
        }
    },
    signup: {
        screen: SignupStack,
        navigationOptions: {
            header: null
        }
    }
});

export default createAppContainer(AppNavigator);
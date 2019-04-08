import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/signup/SignupScreen';
import CodeScreen from './src/screens/signup/CodeScreen';
import LoadScreen from './src/screens/LoadScreen';
import CustomerTypeScreen from './src/screens/signup/CustomerTypeScreen';



const AuthStack = createStackNavigator({
    login: {
        screen: LoginScreen,
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
    signup: {
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
    }
});

export default createAppContainer(AppNavigator);
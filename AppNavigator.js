import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SignupCodeScreen from './src/screens/SignupCodeScreen';
import LoadScreen from './src/screens/LoadScreen';



const AuthStack = createStackNavigator({
    login: {
        screen: LoginScreen,
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
        screen: SignupCodeScreen,
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
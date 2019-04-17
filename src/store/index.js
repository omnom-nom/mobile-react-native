import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from '../reducers';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { AsyncStorage } from 'react-native';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet,
    whitelist: ["customer_info"],
};

const pReducer = persistReducer(persistConfig, reducers);


export const store = createStore(
    pReducer,
    {},
    compose(
        applyMiddleware(thunk),
    )
)

export const persistor = persistStore(store);

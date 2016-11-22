import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
// import {persistStore, autoRehydrate} from 'redux-persist';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import rootReducer from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = (initialState) => {
    const reduxRouterMiddleware = routerMiddleware(browserHistory);

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            // autoRehydrate(),
            applyMiddleware(reduxRouterMiddleware, thunkMiddleware)
        )
    );

    return store;
};

export default configureStore;

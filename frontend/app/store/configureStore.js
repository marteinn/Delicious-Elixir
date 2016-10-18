import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
// import {persistStore, autoRehydrate} from 'redux-persist';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

const configureStore = (initialState) => {
    const reduxRouterMiddleware = routerMiddleware(browserHistory);

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            // autoRehydrate(),
            applyMiddleware(reduxRouterMiddleware, thunkMiddleware)
        )
    );

    return store;
};

export default configureStore;

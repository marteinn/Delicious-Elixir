import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
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

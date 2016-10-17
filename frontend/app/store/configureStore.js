import {createStore, compose, applyMiddleware} from 'redux';
//import {persistStore, autoRehydrate} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';


const configureStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            //autoRehydrate(),
            applyMiddleware(thunkMiddleware)
        )
    );

    return store;
}

export default configureStore;

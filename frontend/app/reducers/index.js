import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import register from './register';
import session from './session';
import link from './link';

const rootReducer = combineReducers({
    routing: routerReducer,
    register,
    session,
    link,
});

export default rootReducer;

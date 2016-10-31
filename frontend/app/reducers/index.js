import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import register from './register';
import session from './session';

const rootReducer = combineReducers({
    routing: routerReducer,
    session,
    register,
});

export default rootReducer;

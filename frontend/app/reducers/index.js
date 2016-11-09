import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import register from './register';
import session from './session';
import links from './links';
import linksByCategory from './linksByCategory';
import currentList from './currentList';

const rootReducer = combineReducers({
    routing: routerReducer,
    register,
    session,
    links,
    linksByCategory,
    currentList,
});

export default rootReducer;

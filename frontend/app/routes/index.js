import { IndexRoute, Route } from 'react-router';
import React from 'react';

import { currentUser } from '../actions/session';
import MainLayout from '../layouts/MainLayout';
import Auth from '../containers/Auth/Auth';
// import Placeholder from '../views/Placeholder';
import SignUp from '../views/SignUp';
import SignIn from '../views/SignIn';
import Home from '../views/Home';
import UserDetail from '../views/UserDetail';


const configRoutes = store => {
    const checkAuth = (nextState, replace, callback) => {
        const { dispatch } = store;
        const { state } = store.getState();

        if (!state && localStorage.getItem('token')) {
            dispatch(currentUser());
        } else if (!localStorage.getItem('token')) {
            replace('/sign-in');
        }

        callback();
    };

    return (
        <Route component={MainLayout}>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />

            <Route path="/" component={Auth} onEnter={checkAuth}>
                <IndexRoute component={Home} />

                <Route path="/users/:username" component={UserDetail} />
            </Route>
        </Route>
    );
};

export default configRoutes;

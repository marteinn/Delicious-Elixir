import { Route } from 'react-router';
import React from 'react';

import { currentUser } from '../actions/session';
import MainLayout from '../layouts/MainLayout';
import Auth from '../containers/Auth';
// import Placeholder from '../views/Placeholder';
import SignUp from '../views/SignUp';
import SignIn from '../views/SignIn';


const configRoutes = store => {
    const checkAuth = (nextState, replace, callback) => {
        const { dispatch } = store;
        const { state } = store.getState();

        console.log(state);

        if (!state && localStorage.getItem('token')) {
            dispatch(currentUser());
            //dispatch(
        } else if (!localStorage.getItem('token')) {
            replace('/sign-in');
        }

        callback();
    };

    return (
        <Route component={MainLayout}>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/" component={Auth} onEnter={checkAuth} />
        </Route>
    );
};

export default configRoutes;

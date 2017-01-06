import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { currentUser } from '../actions/session';
import MainLayout from '../layouts/MainLayout';
import Auth from '../containers/Auth';

import SignOut from '../views/SignOut';
import Home from '../views/Home';
import UserDetail from '../views/UserDetail';
import Start from '../views/Start';
import Settings from '../views/Settings';


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
            <Route path="/sign-out" component={SignOut} />

            <Route path="/start" component={Start}>
                <Route path="/sign-in" component={Start} />
                <Route path="/sign-up" component={Start} />
            </Route>

            <Route path="/" component={Auth} onEnter={checkAuth}>
                <IndexRoute component={Home} />

                <Route path="/users/:username" component={UserDetail} />
                <Route path="/settings" component={Settings} />
            </Route>
        </Route>
    );
};

export default configRoutes;

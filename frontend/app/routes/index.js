import { Route } from 'react-router';
import React from 'react';

import MainLayout from '../layouts/MainLayout';
import Auth from '../containers/Auth';
// import Placeholder from '../views/Placeholder';
import SignUp from '../views/SignUp';
import SignIn from '../views/SignIn';

const configRoutes = store => (
    <Route component={MainLayout}>
        <Route path="/sign-up" store={store} component={SignUp} />
        <Route path="/sign-in" store={store} component={SignIn} />
        <Route path="/" store={store} component={Auth} />
    </Route>
);

export default configRoutes;

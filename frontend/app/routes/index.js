import { IndexRoute, Route } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Placeholder from '../views/Placeholder';

const configRoutes = (store) => {
    return (
        <Route component={MainLayout}>
            <Route path="/" component={Placeholder} />
        </Route>
    );
}

export default configRoutes;

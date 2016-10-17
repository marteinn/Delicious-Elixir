import { IndexRoute, Route } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Placeholder from '../views/Placeholder';

export default (
    <Route component={MainLayout}>
        <Route path="/" component={Placeholder} />
    </Route>
);

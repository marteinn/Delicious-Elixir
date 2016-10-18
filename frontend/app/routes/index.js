import { Route } from 'react-router';
import React from 'react';

import MainLayout from '../layouts/MainLayout';
import Placeholder from '../views/Placeholder';

const configRoutes = store => (
    <Route component={MainLayout}>
        <Route path="/" store={store} component={Placeholder} />
    </Route>
);

export default configRoutes;

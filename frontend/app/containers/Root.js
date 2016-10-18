import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import configRoutes from '../routes';

const propTypes = {
    routerHistory: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
};

const Root = ({ routerHistory, store }) => (
    <Provider store={store}>
        <Router history={routerHistory}>
            {configRoutes(store)}
        </Router>
    </Provider>
);

Root.propTypes = propTypes;

export default Root;

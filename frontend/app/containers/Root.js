import React, { PropTypes }         from 'react';
import { Provider }                 from 'react-redux';
import { Router, RoutingContext }   from 'react-router';
import configRoutes                 from '../routes';

const Root = ({ routerHistory, store }) => {
    return (
        <Provider store={store}>
            <Router history={routerHistory}>
                {configRoutes(store)}
            </Router>
        </Provider>
    );
};

export default Root;

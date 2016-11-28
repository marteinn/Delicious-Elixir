import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

window.store = store;

if (document.getElementById('main_container')) {
    const target = document.getElementById('main_container');
    const node = <Root routerHistory={history} store={store} />;

    ReactDOM.render(node, target);
}

/*eslint-disable*/
require('expose?Components!./components');
/*eslint-enable*/

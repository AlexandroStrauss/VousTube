import React from 'react';
import ReactDOM from 'react-dom';

import * as sessionApiUtil from './actions/session_actions'
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();

    // FOR TESTING O N L Y
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
});

// FOR TESTING O N L Y
window.login = sessionApiUtil.login
window.logout = sessionApiUtil.logout
window.signup = sessionApiUtil.signup
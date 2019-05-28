import React from 'react';
import ReactDOM from 'react-dom';

import * as sessionApiUtil from './util/session_api_util'
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();

    // FOR TESTING O N L Y
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    const root = document.getElementById('root');
    ReactDOM.render(<h1>Welcome To V O U S T U B E</h1>, root);
});

// FOR TESTING O N L Y
window.login = sessionApiUtil.login;
window.logout = sessionApiUtil.logout;
window.signup = sessionApiUtil.signup;
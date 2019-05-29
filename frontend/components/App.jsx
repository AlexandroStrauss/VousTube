import React from 'react';
import SessionDisplayContainer from './session_display_container';
import LoginFormContainer from './session/login_form_container';
import {Route} from 'react-router-dom'
import SignupFormContainer from './users/signup_form_container';
import { AuthRoute } from '../util/route_util';

const App = () => (
    <div>
        <header>
            <h1>This. Is. VOUSTUBE.</h1>
            <SessionDisplayContainer />
        </header>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />

    </div>
);


export default App;
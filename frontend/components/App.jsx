import React from 'react';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './users/signup_form_container';
import { AuthRoute } from '../util/route_util';
import NavBar from './nav_bar/nav_bar';
import { Switch, Route, Link } from 'react-router-dom';
import NavBarContainer from './nav_bar/nav_bar_container';


const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <Route path="/" component={NavBarContainer} />
        </Switch>
    </div>
);

export default App;
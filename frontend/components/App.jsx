import React from 'react';
import SessionDisplayContainer from './session_display_container';
import LoginFormContainer from './session/login_form_container';
import {Route, Link} from 'react-router-dom'
import SignupFormContainer from './users/signup_form_container';
import { AuthRoute } from '../util/route_util';
import SearchBar from './header/search_bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faYoutube } from '@fortawesome/free-solid-svg-icons'

const App = () => (
    <div>
        <header>
            {/* <div class="left-nav-bar"> */}
                <FontAwesomeIcon icon={faBars} />
                {/* <div className="youtube-icon"><FontAwesomeIcon icon={faYoutube} /></div> */}
            <Link to="/"><h1>This. Is. VOUSTUBE.</h1></Link>
            {/* </div> */}
            <SearchBar />
            <SessionDisplayContainer />
        </header>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />

    </div>
);


export default App;
import React from 'react';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './users/signup_form_container';
import { AuthRoute } from '../util/route_util';
import { Switch, Route, Link } from 'react-router-dom';
import NavBarContainer from './nav_bar/nav_bar_container';
import SideBarContainer from './side_bar/side_bar_container';
import SideBar from './side_bar/side_bar';
import VideoPlayer from './video/video_player';


const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <Route path="/" component={NavBarContainer} />
        </Switch>
        <SideBar />
        <VideoPlayer />

    {/* 
        <video width="800" height="450" controls>
            <source src="https://voustube-dev.s3.amazonaws.com/CG87qGDYLcbNLnD7E8DZu72T" type="video/mp4" />
        </video> */}

            
    </div>
);

export default App;
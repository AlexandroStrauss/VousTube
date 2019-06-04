import React from 'react';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './users/signup_form_container';
import { AuthRoute } from '../util/route_util';
import { Switch, Route, Link } from 'react-router-dom';
import NavBarContainer from './nav_bar/nav_bar_container';
import SideBarContainer from './side_bar/side_bar_container';
import SideBar from './side_bar/side_bar';
import VideoPlayer from './video/video_player';
import VideoForm from './video/video_form';


const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <Route path="/" component={NavBarContainer} />
        </Switch>

        <Route path="/videos/new" component={VideoForm} />

        <Route path="/videos" component={SideBar} />
        {/* <Route path={`/videos/${id}`} component={VideoPlayer} /> */}
        {/* <VideoPlayer /> */}
    </div>
);

export default App;
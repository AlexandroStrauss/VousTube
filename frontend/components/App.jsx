import React from 'react';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './users/signup_form_container';
import { AuthRoute } from '../util/route_util';
import { Switch, Route, Link } from 'react-router-dom';
import SideBar from './side_bar/side_bar';
import VideoForm from './video/video_form';
import VideoPlayerContainer from './video/video_player_container';
import VideoIndexContainer from './video/video_index_container';
import FormNavBarContainer from './nav_bar/form_nav_bar_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import PlayerIndexContainer from './video/player_index_container';
import MasterPlayer from './video/master_player';
import PlayerNavBarContainer from './nav_bar/player_nav_bar_container';


const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>

        <Switch>
            <Route exact path="/videos/new" component={FormNavBarContainer} />
            <Route path="/videos/:id" component={PlayerNavBarContainer} />
            <Route exact path="/videos" component={NavBarContainer} />

            <Route exact path="/" component={NavBarContainer} />

            {/* <Route path="/" component={NavBarContainer} /> */}
        </Switch>

        <Switch>
            <Route path="/videos/new" component={VideoForm} />
            <Route path='/videos/:id' component={MasterPlayer} />
        </Switch>


        <Switch>

            {/* <Route path="/videos/:id" component={PlayerIndexContainer} /> */}
        </Switch>
    </div>
);

export default App;
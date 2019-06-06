import VideoPlayerContainer from "./video_player_container";
import PlayerIndexContainer from "./player_index_container";
import React from 'react';
import NavBarContainer from "../nav_bar/nav_bar_container";

class MasterPlayer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="player-container">
                <VideoPlayerContainer />
                <NavBarContainer />
            </div>
        )
    }
}

export default MasterPlayer;


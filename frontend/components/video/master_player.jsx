import VideoPlayerContainer from "./video_player_container";
import PlayerIndexContainer from "./player_index_container";
import React from 'react';
import NavBarContainer from "../nav_bar/nav_bar_container";
import PlayerNavBarContainer from "../nav_bar/player_nav_bar_container";

class MasterPlayer extends React.Component {
    constructor(props) {
        super(props)

        const vid = document.getElementById("video-container")
        if (vid) {
            vid.select();
        }

    }

    render() {
        return (
            <div id="player-background">
            <div id="player-container">
                {/* <PlayerNavBarContainer /> */}

                <VideoPlayerContainer />
                <PlayerIndexContainer />
            </div>
            </div>
        )
    }
}

export default MasterPlayer;


import VideoPlayerContainer from "./video_player_container";
import PlayerIndexContainer from "./player_index_container";
import React from 'react';

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


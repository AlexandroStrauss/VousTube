import VideoPlayerContainer from "./video_player_container";
import PlayerIndexContainer from "./player_index_container";
import React from 'react';

class MasterPlayer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="player-container">
                <VideoPlayerContainer />
                <PlayerIndexContainer />
            </div>
        )
    }
}

export default MasterPlayer;


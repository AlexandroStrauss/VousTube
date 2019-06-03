import React from 'react';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: "https://voustube-dev.s3.amazonaws.com/coconut_head_sad.mp4"
        }
    }

    // playPause() {
    //     if (video.ended) {
    //         return (< i class="material-icons" >
    //             replay</i >)
    //     } else if (video.paused) {
    //         return (<i class="material-icons">
    //             play_arrow</i>)
    //     } else {
    //         return (<i class="material-icons">
    //             pause</i>)
    //     }
    // }

    render() {
        return (
            <figure id="video-container">
                <video height="300" width="400" controls> 
                    <source src={this.state.videoUrl} />
                    {/* <source src={this.props.videoUrl} type="video/mp4" /> */}
                </video>
                <div id="video-controls">
                    {/* <button type="button" id="play-pause">{playPause}</button> */}
                    {/* <input type="range" id="seek-bar" value="0"> */}
                    {/* <button type="button" id="mute">{volumeButton}</button> */}
                    {/* <input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1" /> */}
                    <button type="button" id="full-screen">Full-Screen</button>
                </div>
            </figure>
        )
    }
}

// video.currentTime -= 5;
// video.currentTime += 5;

// const volumeButton () {
//     if (video.)
//     <i class="material-icons">
//         volume_up</i>
// }



// var changeButtonState = function (type) {
//     // Play/Pause button
//     if (type == 'playpause') {
//         if (video.paused || video.ended) {
//             playpause.setAttribute('data-state', 'play');
//         }
//         else {
//             playpause.setAttribute('data-state', 'pause');
//         }
//     }
//     // Mute button
//     else if (type == 'mute') {
//         mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
//     }
// }


export default VideoPlayer;
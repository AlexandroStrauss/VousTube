import React from 'react';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: "https://voustube-dev.s3.amazonaws.com/coconut_head_sad.mp4",
        }
        this.buttonPresses = this.buttonPresses.bind(this);
        this.playPause = this.playPause.bind(this);
        this.volumeButton = this.volumeButton.bind(this);
        this.swapPlayPause = this.swapPlayPause.bind(this);
        this.swapMute = this.swapMute.bind(this);

        this.state.video = (
            <video onKeyPress={this.buttonPresses}>
                <source src={this.state.videoUrl} />
            </video>
        )
    }

    playPause() {
        if (this.state.video.ended) {
            return (< i class="material-icons" >
                replay</i >)
        } else if (this.state.video.paused) {
            return (<i class="material-icons">
                play_arrow</i>)
        } else {
            return (<i class="material-icons">
                pause</i>)
        }
    }

    volumeButton() {
        if (this.state.video.volume === 0) {
            return (
                <i class="material-icons">volume_off</i>
            )
        } else if 
            (this.state.video.volume < 0.5) {
                return (
                    <i class="material-icons">volume_down</i>
                )
        } else {
            return (
                <i class="material-icons">volume_up</i>
            )
        }
    }

    swapPlayPause () {
        if(this.state.video.paused || this.state.video.ended) {
            this.state.video.play()
        } else {
            this.state.video.pause()
        }
    }

    swapMute () {
        if(this.state.video.muted) {
            this.state.video.unmute()
        } else {
            this.state.video.mute()
        }
    }

    // this.state.video.addEventListener('play', function(){
    //     changeButtonState('playpause');
    // }, false)

    buttonPresses(e) {
        switch (e.key) {
            case "ArrowLeft":
                this.state.video.currentTime -= 5;
            case "ArrowRight":
                video.currentTime += 5;
            case "ArrowUp":
                video.volume += 0.1;
            case "ArrowDown":
                video.volume -= 0.1;
            case " ":
                this.swapPlayPause();
            case "m":
                this.swapMute();
        }
    }

    render() {
        const video = this.state.video;

        return (
            <figure id="video-container" onKeyPress={this.buttonPresses}>
                {/* <video controls> 
                    <source src={this.state.videoUrl} />
                    {/* <source src={this.props.videoUrl} type="video/mp4" /> */}
                {/* </video> */} 
                {video}
                <div id="video-controls">
                    <button type="button" id="play-pause">{this.playPause()}</button>
                    {/* <input type="range" id="seek-bar" value="0"> */}
                    <button type="button" id="mute">{this.volumeButton()}</button>
                    {/* <input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1" /> */}
                    <button type="button" id="full-screen"><i class="material-icons">fullscreen</i></button>
                </div>
                <div id="video-info">
                    
                    {/* <h3>{video.title}</h3> */}
                </div>
            </figure>
        )
    }
}


// document.onkeydown = checkKey;

// function checkKey(e) {

    
//     e = e || window.event;

//     if (e.keyCode == '38') {
//         // up arrow
//     }
//     else if (e.keyCode == '40') {
//         // down arrow
//     }
//     else if (e.keyCode == '37') {
//         // left arrow
//         video.currentTime -= 5;
//         }
//     else if (e.keyCode == '39') {
//         // right arrow
//         video.currentTime += 5;
//     }

// }

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


{/* <i class="material-icons">
    fullscreen
</i>

    <i class="material-icons">
        fullscreen_exit
</i> */}



export default VideoPlayer;
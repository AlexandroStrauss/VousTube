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

        this.videoEle = (
            <video onKeyPress={this.buttonPresses} id="video">
                <source src={this.state.videoUrl} />
            </video>
        )
    }

    componentDidMount() {
        this.video = document.getElementById('video');
    }

    playPause() {
        if (this.video.ended) {
            return (< i class="material-icons" >
                replay</i >)
        } else if (this.video.paused) {
            return (<i class="material-icons">
                play_arrow</i>)
        } else {
            return (<i class="material-icons">
                pause</i>)
        }
    }

    volumeButton() {
        if (this.video.volume === 0) {
            return (
                <i class="material-icons">volume_off</i>
            )
        } else if 
            (this.video.volume < 0.5) {
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
        debugger
        if(this.video.paused || this.video.ended) {
            this.video.play()
        } else {
            this.video.pause()
        }
    }

    swapMute () {
        debugger
        if(this.video.muted) {
            this.video.muted = false;
        } else {
            this.video.muted = true;
        }
    }

    // this.video.addEventListener('play', function(){
    //     changeButtonState('playpause');
    // }, false)

    buttonPresses(e) {
        debugger
        switch (e.key) {
            case "ArrowLeft":
                this.video.currentTime -= 5;
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
        const video = this.videoEle;

        return (
            <figure id="video-container" onKeyPress={this.buttonPresses}>
                {/* <video controls> 
                    <source src={this.state.videoUrl} />
                    {/* <source src={this.props.videoUrl} type="video/mp4" /> */}
                {/* </video> */} 
                {video}
                <div id="video-controls">
                    <button type="button" id="play-pause">Q</button>
                    {/* <input type="range" id="seek-bar" value="0"> */}
                    <button type="button" id="mute">IJW</button>
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
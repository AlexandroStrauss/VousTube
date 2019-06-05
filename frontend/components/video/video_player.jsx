import React from 'react';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "",
            author: {},
            play_icon: <i class="material-icons">pause</i>,
            volume_icon: <i class="material-icons">volume_up</i>,
            timer: "0:00",
            fullscreen: <i class="material-icons">fullscreen</i>,
        }

        this.buttonPresses = this.buttonPresses.bind(this);
        this.playPause = this.playPause.bind(this);
        this.volumeButton = this.volumeButton.bind(this);
        this.swapPlayPause = this.swapPlayPause.bind(this);
        this.setupVideo = this.setupVideo.bind(this);
        this.swapMute = this.swapMute.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.timer = this.timer.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
    }

    componentDidMount() {
        this.props.fetchVideo(this.props.match.params.id)
            .then(response => {
                this.setState({url: response.video.videoUrl, author: response.user})
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.video && (prevProps.video.id != this.props.video.id)) {
            this.props.fetchVideo(this.props.match.params.id)
                .then(
                        window.location.reload()
                    )
        }
    }

    setupVideo(videoUrl) {
        this.video =  (
            <video autoFocus onKeyPress={this.buttonPresses} id="video" autoPlay >
                <source src={videoUrl} />
            </video>
        )
        return (this.video)
    }

    volumeButton() {
        this.video = document.getElementById('video');

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

    swapPlayPause() {
        let video = document.getElementById('video');
        if (video.paused || video.ended) {
            video.play()
            this.setState({ play_icon: < i class="material-icons" >pause</i > })
            // this.playPause()
        } else {
            video.pause()
            this.setState({ play_icon: < i class="material-icons" >play_arrow</i > })
            // this.playPause()
        }
    }

    playPause() {
        let video = document.getElementById('video');

        if (video) { 
            if (video.ended) {
                this.setState({play_icon: < i class="material-icons" >replay</i >})
            } else if (video.paused) {
                this.setState({ play_icon: < i class="material-icons" >play-arrow</i > })
            } else {
                this.setState({ play_icon: < i class="material-icons" >pause</i > })
        }
    }
    }

    swapMute () {
        let video = document.getElementById('video');
        if (video.muted) { 
            video.muted = false;
            this.setState({ volume_icon: < i class="material-icons" >volume_up</i > })

        } else {
            video.muted = true;
            this.setState({ volume_icon: < i class="material-icons" >volume_off</i > })
        }
    }


    swapFullscreen () {
        let video = document.getElementById('video');

        //method from Matt West at teamtreehouse.com
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }
    }

    changeTime() {
        let video = document.getElementById('video');
        let seekBar = document.getElementById('seek-bar');
        
        var time = video.duration * (seekBar.value / 100);

        video.currentTime = time;
        
    }

    timer() {
        let video = document.getElementById('video');
        let seekBar = document.getElementById('seek-bar');

        // let time = video.currentTime;
        // let minutes = Math.floor(time / 60);
        // let newTime = (minutes + ":" + (time % 60));
        // this.setState({ timer: newTime })

        var value = (100 / video.duration) * video.currentTime;

        // Update the slider value
        seekBar.value = value;
    }

    // parseDate () {
    //     let date = this.props.video.video.record.created_at
    // }

    pause () {
        let video = document.getElementById('video');
        video.pause();
    }

    play() {
        let video = document.getElementById('video');
        video.play();
    }


    buttonPresses(e) {
        debugger
        let video = document.getElementById('video');
        debugger
        e.preventDefault();
        switch (e.keyCode) {
            case 39:
                video.currentTime += 5;
                break;
            case 37:
                if (video.currentTime < 5) {
                    video.currentTime = 0;
                } else { video.currentTime -= 5};
                break;
            case 38:
                if (video.volume <= 0.9) {
                video.volume += 0.1 }
                else {video.volume = 1};
                break;
            case 40:
                if (video.volume >= 0.1) {
                    video.volume -= 0.1
                }
                else { video.volume = 0 };
                break;
            case 32:
                this.swapPlayPause();
                break;
            case 77:
                this.swapMute();
                break;
        }
    }

    render() {
        // this.video = document.getElementById('video');
        if (!this.state.url || !this.props.video) {
            return null;
        }
        const video = this.video;
        const author = this.props.users[this.props.video.author_id]
        return (
            <figure id="video-container" autoFocus onKeyDown={this.buttonPresses}>
                <div className="video-background">
                {this.setupVideo(this.state.url)}
                </div>
                <div id="video-controls" className="controls" data-state="hidden">
                    <button type="button" onClick={this.swapPlayPause} id="play-pause">
                        {this.state.play_icon}
                    </button>

                    <button type="button" onClick={this.swapMute} id="volume-icon">{this.state.volume_icon}</button>

                    <div id="timer">{this.state.timer}</div>
                    <input type="range" id="seek-bar" value="0" 
                        onChange={this.changeTime} 
                        onTimeUpdate={this.timer} 
                        onMouseDown={this.pause} 
                        onMouseUp={this.play}
                    />
                    
                    {/* <input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1" /> */}
                    <button type="button" id="full-screen" onClick={this.swapFullscreen}>{this.state.fullscreen}</button>
                </div>
                <div id="video-info">
                    <div className="video-stats">
                        <div className="vid-title">{this.props.video.title}</div>
                    </div>

                    <div className="author-stuff">
                        <div className="author-thumbnail" >
                            <p>{author.username[0]}</p>
                        </div >

                        <div className="author-publish">
                            <div className="vid-author">{author.username}</div>
                            <div className="publish-date">Published on {this.props.video.created_at}</div>
                        </div>
                    </div>

                    <div className="vid-description">{this.props.video.description}</div>
                </div>
            </figure>
        )
    }
}

// document.onkeydown = checkKey;


// video.currentTime -= 5;
// video.currentTime += 5;

// const volumeButton () {
//     if (video.)
//     <i class="material-icons">
//         volume_up</i>
// }



{/* <i class="material-icons">
    fullscreen
</i>

    <i class="material-icons">
        fullscreen_exit
</i> */}

export default VideoPlayer;
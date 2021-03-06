import React from 'react';
import CommentIndexContainer from '../comment/comment_index_container';
import { Route } from 'react-router-dom';
import VideoLikeInterfaceContainer from './video_like_interface_container';
import currentDate from '../../util/date_parsers/current_date'

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "",
            author: {},
            play_icon: "pause",
            volume_icon: <i className="material-icons">volume_up</i>,
            timer: "0:00/0:00",
            fullscreen: <i className="material-icons">fullscreen</i>,
            volume: 1,
            oldLike: null,
            likes: null,
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
        this.setVolume = this.setVolume.bind(this);
        this.calculateTime = this.calculateTime.bind(this);
        this.setTime = this.setTime.bind(this);

        // allows keyboard controls for video player
        window.addEventListener("keydown", this.buttonPresses);
    }

    componentDidMount() {
        let that = this;
        this.props.fetchVideo(this.props.match.params.id).then(response => 
                that.setState({url: response.video.videoUrl, author: response.user})
            );
        
        // ensures that the view is reset to the top if the page is refreshed or a new video selected
        window.scrollTo(0, 0)
    }

    // ensures that clicking on a new video actually loads that video
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
            <video onTimeUpdate={this.timer} id="video" onKeyDown={this.buttonPresses} autoPlay >
                <source src={videoUrl} />
            </video>
        )
        return (this.video)
    }

    // controls functioning of pausing/unpausing video
    swapPlayPause() {
        let video = document.getElementById('video');
        if (video.paused || video.ended) {
            video.play()
            this.setState({ play_icon: "pause" })
            // this.playPause()
        } else {
            video.pause()
            this.setState({ play_icon: "play_arrow" })
            // this.playPause()
        }
    }

    // deals entirely with play/pause/replay icons
    playPause() {
        let video = document.getElementById('video');

        if (video) { 
            if (video.ended) {
                this.setState({play_icon: "replay"})
            } else if (video.paused) {
                this.setState({ play_icon: "play_arrow" })
            } else {
                this.setState({ play_icon: "pause" })
            }
        }
    }

    // mutes or unmutes video
    swapMute () {
        let video = document.getElementById('video');
        let volBar = document.getElementById('volume-bar');

        if (video.muted) { 
            video.muted = false;
            this.setState({ volume_icon: < i className="material-icons" >volume_up</i > })
            volBar.value = video.volume;

        } else {
            video.muted = true;
            this.setState({ volume_icon: < i className="material-icons" >volume_off</i > })
            volBar.value = 0;
        }
    }

    // Enters fullscreen. Uses the default HTML5 fullscreen player, unaltered
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

    // Displays time in video
    changeTime() {
        let video = document.getElementById('video');
        let seekBar = document.getElementById('seek-bar');
        
        var time = video.duration * (seekBar.value / 100);

        video.currentTime = time;
        this.calculateTime();
    }

    // Adjusts size of seek bar divs to reflect how much of video has played
    calculateTime() {
        let video = document.getElementById('video');
        let seekBarPlayed = document.getElementById('seek-bar-played');
        let seekBarBuffered = document.getElementById('seek-bar-buffered');

        var time = video.currentTime;
        var duration = video.duration;
        var buffered = video.buffered.end(0);
        var playedPercent = (time/duration) * 100;
        var bufferedPercent = (buffered/duration) * 100;
        seekBarPlayed.style.width = playedPercent.toString()+"%"
        seekBarBuffered.style.width = bufferedPercent.toString()+"%"
    }

    setTime(e) {
        let video = document.getElementById('video');
        var newTime = video.duration * (e.clientX/video.style.width);
        video.currentTime = newTime;
    }

    // Creates a string to display current time
    timer() {
        let video = document.getElementById('video');
        let seekBar = document.getElementById('seek-bar');

        let newTime = video.currentTime * (100 / video.duration)
        if (!newTime) { newTime = 0 }
        seekBar.value = newTime;

        // this.curtimetext.innerHTML = curmins + ":" + cursecs
        // this.durtimetext.innerHTML = durmins + ":" + dursecs
        let time = video.currentTime;
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (seconds < 10) { seconds = "0" + seconds}
        let newTimer = (minutes + ":" + seconds);

        let dur = video.duration;
        let durminutes = Math.floor(dur / 60);
        let dursecs = Math.floor(dur % 60);
        if (dursecs < 10) { dursecs = "0" + dursecs }
        let duration = (durminutes + ":" + dursecs);
        
        this.setState({ timer: newTimer + "/" + duration })
        this.calculateTime();
        this.playPause();
    }

    // method to change video volume by sliding volume bar
    setVolume() {
        let video = document.getElementById('video');
        let volBar = document.getElementById('volume-bar');

        if (!volBar.value) { volBar.value = 1 }

        video.volume = volBar.value;
        this.setState({ volume: video.volume })
        this.volumeButton()
    }

    // Handles rendering icons for volume button
    volumeButton() {
        this.video = document.getElementById('video');

        if (this.video.volume === 0) {
            this.setState({ volume_icon: <i className="material-icons">volume_mute</i> })
        } else if
            (this.video.volume < 0.5) {
            this.setState({ volume_icon: <i className="material-icons">volume_down</i> })
        } else {
            this.setState({ volume_icon: <i className="material-icons">volume_up</i> })
        }
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

    // Routes all keyboard inputs to appropriate methods
    buttonPresses(e) {
        let video = document.getElementById('video');
        let volBar = document.getElementById('volume-bar');
        switch (e.keyCode) {
            case 39:
                e.preventDefault();

                video.currentTime += 5;
                break;
            case 37:
                e.preventDefault();

                if (video.currentTime < 5) {
                    video.currentTime = 0;
                } else { video.currentTime -= 5};
                break;
            case 38:
                e.preventDefault();

                if (video.volume <= 0.9) {
                video.volume += 0.1 }
                else {video.volume = 1};
                volBar.value = video.volume;

                this.setVolume();

                break;
            case 40:
                e.preventDefault();

                if (video.volume >= 0.1) {
                    video.volume -= 0.1
                }
                else { video.volume = 0 };
                volBar.value = video.volume;
                this.setVolume();

                break;
            case 32:
                if (e.target === document.body) {
                e.preventDefault();
                    this.swapPlayPause();
                }
                break;
            case 77:
                // e.preventDefault();

                this.swapMute();
                break;
        }
    }
    
    render() {
        if (!this.state.url || !this.props.video) {return null;}

        const author = this.props.users[this.props.video.author_id]
        return (
            <figure id="video-container"  
                onKeyDown={this.buttonPresses}
            >
                <div className="video-background" onClick={this.swapPlayPause} >
                {this.setupVideo(this.state.url)}
                </div>

                <div id="seek-bar-played"
                    onClick={this.setTime}
                    >
                </div>
                <div id="seek-bar-buffered" 
                    onClick={this.setTime}
                    >

                </div>
                <div id="seek-bar-background"
                ></div>

                <input type="range" id="seek-bar"
                    onChange={this.changeTime}
                    // onClick={this.setTime}
                    // onTimeUpdate={this.timer} 
                    // onMouseDown={this.pause}
                    // onMouseUp={this.play}
                />
                
                <div id="video-controls" className="controls" data-state="hidden">
                    <div id="left-controls" >

                    <button type="button" onClick={this.swapPlayPause} id="play-pause" >
                            <i className="material-icons">{this.state.play_icon}</i>
                    </button>

                    <button type="button" onClick={this.swapMute} id="volume-icon">{this.state.volume_icon}</button>
                    <div id="volume-bkgrd"></div>
                    <input type="range"
                        onChange={this.setVolume}
                        id="volume-bar"
                        min="0" max="1"
                        step="0.1" />

                    <div id="timer">{this.state.timer}</div>
                    </div>
                    
                    <div id="right-controls">
                    <button type="button" id="full-screen" onClick={this.swapFullscreen}>{this.state.fullscreen}</button>
                    </div>
                </div>
                <div id="video-info">
                    <div className="video-stats">
                        <div className="vid-title">{this.props.video.title}</div>
                        <div className="vid-stats">
                            <div className="views">
                                {this.props.video.views + (this.props.video.views === 1 ? " view" : " views")}
                            </div>


                            <Route render={props => <VideoLikeInterfaceContainer {...props} video={this.props.video} />} /> 
                        </div>
                    </div>

                    <div className="author-stuff">
                        <div className="author-thumbnail" >
                            <p>{author.username[0].toUpperCase()}</p>
                        </div >

                        <div className="author-publish">
                            <div className="vid-author">{author.username}</div>
                            <div className="publish-date">Published on {currentDate(this.props.video.created_month, this.props.video.created_day, this.props.video.created_year)}
                            
                            </div>
                        </div>
                    </div>

                    <div className="vid-description">{this.props.video.description}</div>
                </div>
                
                <Route component={CommentIndexContainer}/>

            </figure>
        )
    }
}

export default VideoPlayer;
import React from 'react';
import timeago from 'timeago.js';
import { Link } from 'react-router-dom';

class VideoIndex extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            videos: []
        }
        // this.fetchVideos = this.fetchVideos.bind(this);
        this.timestamp = this.timestamp.bind(this);
    }

    componentDidMount() {
        this.props.fetchVideos();
    }

    timestamp(time) {
        return timeago.format(time)
    }

    randomize(arr) {
        //owing heavily to a solution posted on StackOverflow  
        let clone = arr.slice(0);
        var currentIndex = clone.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = clone[currentIndex];
            clone[currentIndex] = clone[randomIndex];
            clone[randomIndex] = temporaryValue;
        }
        return clone;
    }


    render () {
        const videos = this.props.videos ? this.props.videos.map(video => {
            return(
            <li className="video">
                <a className="video-tile" href={`/#/videos/${video.id}`}>
                        <img src={video.imageUrl ? video.imageUrl : 
                        // (video.default_thumb ? video.default_thumb : 
                            window.defaultImg} 
                        />
                    <div className="vid-info">
                        <div className="duration">{video.duration}</div>
                        <div className="title">{video.title}</div>     
                        <div className="author">{this.props.authors[video.author_id].username}</div>     
                        {/* <div className="timestamp">{this.timestamp(video.created_at)}</div>*/}
                    </div>
                </a>
            </li>
            )
        }) : [] 
        const randVideos = this.randomize(videos);
        const randVideos2 = this.randomize(videos);

        return(
            <div id="idx-shell">
                <p id="recommended">Recommended</p>

                <ul className="video-idx">
                    {randVideos}
                    <div id="line-container">

                    </div>
                </ul>

                <p id="recommended">From your subscriptions</p>

                <ul className="video-idx">
                    {randVideos2}
                </ul>

            </div>
        )
    }
}

export default VideoIndex;
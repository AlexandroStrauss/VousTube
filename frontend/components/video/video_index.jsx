import React from 'react';
import timeago from 'timeago.js';
import { Link } from 'react-router-dom';

class VideoIndex extends React.Component {
    constructor (props) {
        // debugger
        super(props);
        this.state = {
            videos: []
        }
        // debugger
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
        // debugger
        const videos = this.props.videos ? this.props.videos.map(video => {
            return(
            <li className="video">
                <a className="video-tile" href={`/#/videos/${video.id}`}>
                    <img src="assets/e.png" />
                    <div className="duration">{video.duration}</div>
                    <div className="title">{video.title}</div>     
                    <div className="author">{this.props.authors[video.author_id].username}</div>     
                    {/* <div className="timestamp">{this.timestamp(video.created_at)}</div>              */}
                </a>
            </li>
            )
        }) : [] 
        const randVideos = this.randomize(videos);

        return(
            <ul className="video-idx">
                {randVideos}
            </ul>
        )
    }
}

export default VideoIndex;
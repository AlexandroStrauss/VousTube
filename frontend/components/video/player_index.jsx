import React from 'react';
import timeago from 'timeago.js';
import { Link } from 'react-router-dom';

class PlayerIndex extends React.Component {
    constructor(props) {
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

    render() {
        const videos = this.props.videos ? this.props.videos.map(video => {
            // debugger
            return (
                <li className="video" key={video.id}>
                    <a className="video-tile" href={`/#/videos/${video.id}`}>
                        <img src={video.imageUrl ? video.imageUrl : window.defaultImg} />
                        <div className="duration">{video.duration}</div>
                        <div className="player-idx-deets">
                            <div className="title">{video.title}</div>
                            <div className="author">{this.props.authors[video.author_id].username}</div>
                            {/* <div className="timestamp">{this.timestamp(video.created_at)}</div> */}
                        </div>
                    </a>
                </li>
            )
        }) : []
        const randVideos = this.randomize(videos);

        return (
            <ul className="player-idx">
                <p>Up next</p>
                {randVideos[0]}
                <div className="line"></div>

                {randVideos.slice(1)}
            </ul>
        )
    }
}

export default PlayerIndex;
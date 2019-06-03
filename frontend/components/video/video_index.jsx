import React from 'react';

class VideoIndex extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            videos: []
        }
        this.fetchVideos = this.fetchVideos.bind(this);
    }

    componentDidMount() {
        this.props.fetchVideos();
    }

    render () {
        const randVideos = shuffle(this.props.videos);
        videos = randVideos.forEach(video => {
            <li className="video">
                <a className="video-tile" href={`/api/videos/${video.id}`}>
                    <img url={video.thumbnail_img} />
                    <div className="duration">{video.duration}</div>
                    <div className="title">{video.title}</div>
                </a>
            </li>
        })

        return(
            <ul>
                {videos}
            </ul>
        )
    }
}

export default VideoIndex;
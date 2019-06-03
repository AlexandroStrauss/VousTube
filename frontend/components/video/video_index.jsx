import React from 'react';

class VideoIndex extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        videos = this.props.videos.forEach(video => {
            <li className="video">
                <a className="video-tile" href={`/api/videos/${video.id}`>
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
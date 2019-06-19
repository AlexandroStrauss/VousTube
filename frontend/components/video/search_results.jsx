import React from 'react';


class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        debugger
    }

    componentDidMount() {
        this.props.fetchVideos;
    }

    render () {
        const videos = this.props.videos ? this.props.videos.map(video => {
            return (
                <li className="result-video">
                    <a className="result-video-tile" href={`/#/videos/${video.id}`}>
                        <img src={video.imageUrl ? video.imageUrl : window.defaultImg} />
                        <div className="vid-info">
                            <div className="duration">{video.duration}</div>
                            <div className="title">{video.title}</div>
                            <div className="author">{this.props.authors[video.author_id].username}</div>
                            <div className="description">{video.description}</div>
                            {/* <div className="timestamp">{this.timestamp(video.created_at)}</div>*/}
                        </div>
                    </a>
                </li>
            )
        }) : [] 

        return (
            <div id="result-shell">
                <ul className="video-results">
                    {videos}
                    <div id="line-container">

                    </div>
                </ul>
            </div>
        )

    }
}

export default SearchResults;
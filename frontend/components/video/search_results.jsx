import React from 'react';
import videoAge from '../../util/date_parsers/video_age';


class SearchResults extends React.Component {
    constructor(props) {
        super(props)

        //this may have to change for Heroku hosting
        const path = window.location.href.split('/');
        var search = path.slice(-1)[0];
        this.state = {
            search: search.split('%20').join(" "),
        }
        this.searchResults = this.searchResults.bind(this)
        debugger
    }

    componentDidMount() {
        this.props.fetchVideos();
    }

    componentDidUpdate(prevProps) {
        const path = window.location.href.split('/');
        var search = path.slice(-1)[0];
        debugger
        if (this.state.search != search) {
            this.props.fetchVideos();
            this.setState({search: search})
        }
        // debugger
        // if (prevProps.searchResults && (prevProps.searchResults[0] != this.props.searchResults[0])) { //if route changes
        //     this.props.fetchVideos()
        //         .then(
        //             window.location.reload(true)
        //         )
        // }
    }

    searchResults() {
        let searchTitles = [];
        this.props.videos.forEach((film) => {
            if (film.title.toLowerCase().startsWith(this.state.search.toLowerCase())
                || film.description.includes(this.state.search)) {
                searchTitles.push(film)
            }
        })
        return searchTitles;
    }

    render () {
        var searchResults;
        // if(this.props.location) {
        //     searchResults = this.props.location.state.videos;
        // } else {
            searchResults = this.searchResults();
        // }

        const videos = searchResults.map(video => {
            return (
                <li className="result-video" key={video.id}>
                    <a className="result-video-tile" href={`/#/videos/${video.id}`}>
                        <img src={video.imageUrl ? video.imageUrl : window.defaultImg} />
                        <div id="vid-info">
                            <div className="duration">{video.duration}</div>
                            <div className="result-title">{video.title}</div>
                            <div className="result-author">{this.props.authors[video.author_id].username + " • " + video.views + (video.views === 1 ? " view" : " views") + " • " + videoAge(video.time_since_creation)}</div>
                            <div className="description">{video.description}</div>
                        </div>
                    </a>
                </li>
            )
        })

        if (!videos[0]) {
            return (
                <>
                {/* // I lifted this "no results found" image straight from YouTube */}
                <div id="failure-msg">
                    <div id="filter">
                        <div id="sub-filter">
                            <i className="material-icons">tune</i>FILTER
                        </div>
                    </div>

                    <div id="failure-submsg">
                        <img id="failure-img" src={window.failureImg} />
                        <div id="no-results">No results found</div>
                        <div id="try-again">Try different keywords</div>
                    </div>

                    <div id="bottom-spacer"></div>
                </div>
                </>
            )
        } else {
        return (
            <div id="result-shell">
                <div id="filter">
                    <div id="sub-filter">
                        <i className="material-icons">tune</i>FILTER
                        </div>
                </div>

                <ul className="video-results">
                    {videos}
                </ul>
            </div>
        )
        }
    }
}

export default SearchResults;
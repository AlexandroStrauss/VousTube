import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        this.props.fetchVideos();
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    searchResults() {
        let searchTitles = [];

        if (this.state.search != '') {
            debugger
            this.props.videos.forEach((film) => {
                debugger
                if (film.title.toLowerCase().startsWith(this.state.search.toLowerCase())
                    // || film.description.includes(this.state.search)
                    ) {
                    searchTitles.push(film)
                }
            })
        }
        return searchTitles;
    }

    render () {
        const results = this.searchResults().map((result, i) => {
            return (
                <li key={result.id} >
                    <Link to={`/videos/${result.id}`}>{result.title}
                    </Link>
                </li>
            )
        })

        return(
            <>
            <div className="search-bar">
                <input type="text" placeholder="Search"
                onChange={this.update('search')}
                />
                    <ul className={results[0] ? "search-results" : "search-results-hidden"}>
                        {results}
                    </ul>

                <button className="searcher">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>


            </>
        )
    }
}

export default SearchBar;
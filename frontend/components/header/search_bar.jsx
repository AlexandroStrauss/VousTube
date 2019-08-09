import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router'

class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            search: '',
            focused: false,
            videoResults: null,
        }
        this.updateFocus = this.updateFocus.bind(this);
        this.goSearch = this.goSearch.bind(this);
        this.parseKey = this.parseKey.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.props.fetchVideos();
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value }, () => {
            })
        }
    }

    searchResults() {
        let searchTitles = [];
        this.state.videoResults = [];
        if (this.state.search != '') {
            this.props.videos.forEach((film) => {
                if (film.title.toLowerCase().startsWith(this.state.search.toLowerCase())
                    ) {
                    searchTitles.push(film)
                }

                if (film.title.toLowerCase().startsWith(this.state.search.toLowerCase())
                    || film.description.includes(this.state.search)) 
                    {
                        this.state.videoResults.push(film)
                    }
            })
        }
        return searchTitles;
    }

    updateFocus() {
        let newBool;
        if (this.state.focused) {newBool = false} else {newBool = true}
        this.setState({focused: newBool}, () => {
         })
    }

    parseKey(e) {
        if(e.key === "Enter") {
            this.goSearch();
        } 
    }

    goSearch(e) {
        if (this.state.search != "") {
            this.props.history.push({pathname: `/results/${this.state.search}`,
                state: {videos: this.state.videoResults}}, () => {window.location.reload()}
            )
        } 
    }

    goToResult(searchTerm) {
        debugger
        console.log(searchTerm);
        this.props.history.push({ pathname: `/results/${searchTerm}`})
        // debugger
        // this.setState({ search: searchTerm }, () => {this.goSearch()});
    }
    
    render () {
        const searchResults = []

        this.searchResults().forEach(result => {
            if (!searchResults.includes(result.title)) {
                searchResults.push(result.title)
            }
        })

        const results = searchResults.map((result) => {
            return (
                <li 
                // key={indexOf(result)} 
                onClick={
                    (e) => {
                        e.preventDefault();
                        this.goToResult(result)
                    }
                }
                >
                    {result}
                </li>
            )
        })        

        return(
            <>
            <div className="search-bar">
                <input type="text" placeholder="Search" id="search-input"
                onChange={this.update('search')}
                onFocus={this.updateFocus}
                // onBlur={this.updateFocus}
                onKeyPress={this.parseKey}
                />

                <div className="search-results">
                    <ul 
                    className={results[0] ? "results-list" :"results-hidden"}
                    >
                    {results}
                </ul>
                </div>

                <button className="searcher" onClick={this.goSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            </>
        )
    }
}

export default withRouter(SearchBar);
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            search: '',
            focused: false
        }
        this.updateFocus = this.updateFocus.bind(this);
        this.goSearch = this.goSearch.bind(this);
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
            this.props.videos.forEach((film) => {
                if (film.title.toLowerCase().startsWith(this.state.search.toLowerCase())
                    // || film.description.includes(this.state.search)
                    ) {
                    searchTitles.push(film)
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

        // this.setState(prevState => ({
        //     focused: !prevState.focused}))
    }

    parseKey(e) {
        if(e.keyCode === 13) {
            this.goSearch();
        }
    }
    goSearch(result) {
        debugger
        if (result != "") {
                debugger
                <Redirect to={{
                pathname: `/results/${result}`,
                state: {result: result}
                }} 
                />
            } 
    }
    
    render () {
        const results = this.searchResults().map((result, i) => {
            return (
                <li key={result.id} onClick={this.goSearch(result.title)}>
                    {/* <Link to={`/videos/${result.id}`}> */}
                    {result.title}
                    {/* </Link> */}
                </li>
            )
        })

        return(
            <>
            <div className="search-bar">
                <input type="text" placeholder="Search"
                onChange={this.update('search')}
                onFocus={this.updateFocus}
                onBlur={this.updateFocus}
                onKeyPress={this.parseKey}
                />
                    <ul className={results[0] ? (this.state.focused ? "search-results" : "search-results-hidden") : "search-hidden"}>
                        {results}
                    </ul>

                <button className="searcher" onClick={this.goSearch(this.state.search)}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>


            </>
        )
    }
}

export default SearchBar;
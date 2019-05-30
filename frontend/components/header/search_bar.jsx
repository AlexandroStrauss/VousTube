import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchBar extends React.Component {

    render () {
        return(
            <div className="search-bar">
                <input type="text" placeholder="Search"/>
                <button className="searcher">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        )
    }

}

export default SearchBar;
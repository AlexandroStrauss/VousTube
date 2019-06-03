import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faVideo, faBell, faComment, faTh, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../header/search_bar';
import { Route, Link } from 'react-router-dom';
import SessionDisplayContainer from '../session_display_container';
import SideBar from '../side_bar/side_bar';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentUser;
    }

    componentDidMount() {
        this.props.currentUser;
    }

    bellMore() {
        if (this.props.currentUser) {
            return <FontAwesomeIcon icon={faBell} />
        } else {
            return <FontAwesomeIcon icon={faEllipsisV} />
        }
    }
    
    render () {
        return (
            <header>

                <div class="left-nav-bar">
                    <button><FontAwesomeIcon icon={faBars} /></button>
                    {/* <div className="youtube-icon"><FontAwesomeIcon icon={faYoutube} /></div> */}
                    <Link to="/"><img src={window.logo} width="101" height="25"/></Link>
                    {/* <Link to="/"><h1>VousTube</h1></Link> */}

                </div>

                <SearchBar />

                <div className="nav-right-side">
                    <div className="nav-btns">
                        <button><FontAwesomeIcon icon={faVideo} /></button>
                        <button><FontAwesomeIcon icon={faTh} /></button>
                        <button><FontAwesomeIcon icon={faComment} /></button>
                        <button>{this.bellMore()}</button>
                    </div>

                    <SessionDisplayContainer />
                </div>
            </header>
        )
    }
}

export default NavBar;
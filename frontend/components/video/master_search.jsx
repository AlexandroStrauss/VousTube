import React from 'react';
import SideBar from '../side_bar/side_bar';
import SearchResultsContainer from './search_results_container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faVideo, faBell, faComment, faTh, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { Route, Link } from 'react-router-dom';
import SessionDisplayContainer from '../session_display_container';
import SearchBarContainer from '../header/search_bar_container';


class MasterSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            open: false,
        }
        this.videoClick = this.videoClick.bind(this)
        this.sidebarClick = this.sidebarClick.bind(this)
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

    loginPath() {
        if (this.props.currentUser) {
            return '/videos/new'
        } else {
            return '/login'
        }
    }

    videoClick() {
        this.setState({ clicked: !this.state.clicked })
    }

    sidebarClick() {
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <>
                <header>

                    <div className="left-nav-bar">
                        <button onClick={this.sidebarClick}><FontAwesomeIcon icon={faBars} /></button>
                        {/* <div className="youtube-icon"><FontAwesomeIcon icon={faYoutube} /></div> */}
                        <Link to="/"><img src={window.logo} width="101" height="25" /></Link>
                        {/* <Link to="/"><h1>VousTube</h1></Link> */}

                    </div>

                    <SearchBarContainer />

                    <div className="nav-right-side">
                        <div className="nav-btns">
                            <button onClick={this.videoClick}><FontAwesomeIcon icon={faVideo} /></button>
                            <div className={this.state.clicked ? (this.props.currentUser ? "vid-upload" : "vid-upload-shifted") : "vid-upload-hidden"}>
                                <Link to={this.loginPath()}>
                                    <i className="material-icons">cloud_upload</i>
                                    <p>Upload video</p>
                                </Link>
                            </div>
                            <button><FontAwesomeIcon icon={faTh} /></button>
                            <button><FontAwesomeIcon icon={faComment} /></button>
                            <button>{this.bellMore()}</button>
                        </div>

                        <Route render={props => <SessionDisplayContainer {...props}/> } />
                    </div>
                </header>

                <div id="index-container">

                    <section className={this.state.open ? "sidebar-open" : "sidebar-collapsed"}>
                        <SideBar />
                    </section>

                <Route render={props =><SearchResultsContainer {...props}/> } />
                </div>
            </>
        )
    }
}

export default MasterSearch;
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faVideo, faBell, faComment, faTh, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Route, Link } from 'react-router-dom';
import SessionDisplayContainer from '../session_display_container';
import SideBar from '../side_bar/side_bar';
import VideoIndexContainer from '../video/video_index_container';
import SearchBarContainer from '../header/search_bar_container';
// import Dropdown from '../../util/dropdowns/dropdown'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            open: false,
            loggedIn: false
        }
        this.videoClick = this.videoClick.bind(this)
        this.sidebarClick = this.sidebarClick.bind(this)
        this.hideForm = this.hideForm.bind(this);
        this.node = React.createRef();
    }

    componentDidMount() {
        this.props.currentUser;
    }

    componentWillMount () {
        document.addEventListener('mousedown', this.hideForm, false)
    }

    componentWillUnmount () {
        document.removeEventListener('mousedown', this.hideForm, false)
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

    videoClick () {
        debugger
        this.setState({clicked: !this.state.clicked})
    }

    sidebarClick() {
        debugger
        this.setState({ open: !this.state.open })
    }

    hideForm (e) {
        if (this.state.clicked) {
            if (this.node.current.contains(e.target)) {
            }
            else {
                this.setState({clicked: false})
            }
        }
    }
    
    render () {
        return (
            <>
            <header>
                <div className="left-nav-bar">
                    <button onClick={this.sidebarClick}><FontAwesomeIcon icon={faBars} /></button>
                    <Link to="/"><img src={window.logo} width="101" height="25"/></Link>
                </div>

                <SearchBarContainer />

                <div className="nav-right-side">
                    <div className="nav-btns">
                        <button onClick={this.videoClick}><FontAwesomeIcon icon={faVideo} /></button>
                            <div className={this.state.clicked ? (this.props.currentUser ? "vid-upload" : "vid-upload-shifted") : "vid-upload-hidden"} ref={this.node}>
                                <Link to={this.loginPath()}>
                                    <i className="material-icons">cloud_upload</i>
                                    <p>Upload video</p>
                                </Link>
                            </div>
                        <button id="not-clickable"><FontAwesomeIcon icon={faTh} /></button>
                        <button id="not-clickable"><FontAwesomeIcon icon={faComment} /></button>
                        <button id="not-clickable">{this.bellMore()}</button>
                    </div>

                    <SessionDisplayContainer />
                </div>
            </header>

            <div id="index-container">

                <section className={this.state.open ? "sidebar-open" : "sidebar-collapsed"}>
                    <SideBar />
                </section>

                <VideoIndexContainer />
            </div>
            </>
        )
    }
}

export default NavBar;
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
        this.state = {
            clicked: false,
        }
        this.videoClick = this.videoClick.bind(this)
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

    videoClick () {
        this.setState({clicked: !this.state.clicked})
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
                        <button onClick={this.videoClick}><FontAwesomeIcon icon={faVideo} /></button>
                            <div className={this.state.clicked ? "vid-upload" : "vid-upload-hidden"}>
                                <Link to='/videos/new'>
                                <i class="material-icons">cloud_upload</i>
                                <p>Upload video</p>
                                </Link>
                            </div>
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
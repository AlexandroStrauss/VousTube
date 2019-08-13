import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faVideo, faBell, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../header/search_bar';
import { Link } from 'react-router-dom';
import SessionDisplayContainer from '../session_display_container';
import SearchBarContainer from '../header/search_bar_container';


class FormNavBar extends React.Component {
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

    render() {
        return (
            <header className='form-header'>

                <div className="left-nav-bar">
                    <button><FontAwesomeIcon icon={faBars} /></button>
                    <Link to="/"><img src={window.logo} width="101" height="25" /></Link>

                </div>

                <SearchBarContainer />

                <div className="nav-right-side">
                    <div className="nav-btns">
                        <button onClick={this.videoClick}><FontAwesomeIcon icon={faVideo} /></button>
                        <div className={this.state.clicked ? "vid-upload" : "vid-upload-hidden"}>
                            <Link to={this.loginPath()}>
                                <i className="material-icons">cloud_upload</i>
                                <p>Upload video</p>
                            </Link>
                        </div>
                        <button>{this.bellMore()}</button>
                    </div>

                    <SessionDisplayContainer />
                </div>
            </header>
        )
    }
}

export default FormNavBar;
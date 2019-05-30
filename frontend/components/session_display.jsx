import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faBell, faComment, faTh } from '@fortawesome/free-solid-svg-icons'

class SessionDisplay extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.props.currentUser;
    }
    
    componentDidMount() {
        this.props.currentUser;
    }

    render() {
        if (this.props.currentUser) {
            return (
                <div className="current-user-thumbnail">
                    <h3>
                        {this.props.currentUser.username}
                        <button onClick={() => this.props.logout()}>Log Out</button>
                    </h3>
                </div>
            )
        } else {
            return (
                <div className="nav-right-side">
                <div className="nav-btns">
                    <FontAwesomeIcon icon={faVideo} />
                    <FontAwesomeIcon icon={faTh} />
                    <FontAwesomeIcon icon={faComment} />
                    <FontAwesomeIcon icon={faBell} />
                </div>
                <div className="signin-btn">
                    <img src="/assets/signin_img.png" height="25" width="25" />
                    <Link to={'/login'}>Sign In</Link>
                </div>
                </div>
            )
        }
    }
}

export default SessionDisplay;
import React from 'react';
import { Link } from 'react-router-dom';

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
                <div className="signin-btn">
                    
                    {/* <img src="/assets/signin_img.png" height="25" width="25" /> */}
                    <Link to={'/login'}>
                        <i class="material-icons">account_circle</i>
                        Sign In
                        </Link>
                </div>
            )
        }
    }
}

export default SessionDisplay;
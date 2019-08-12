import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// this class deals solely with the Sign In button when not logged in, and the user display when logged in
class SessionDisplay extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            logoutClicked: false,
        }
        this.buttonClick = this.buttonClick.bind(this);
        this.logout = this.logout.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.node = React.createRef();

    }
    
    componentDidMount() {
        this.props.currentUser;
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.hideForm, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.hideForm, false)
    }

    hideForm(e) {
        if (this.state.clicked) {
            if (this.node.current.contains(e.target)) {
            }
            else {
                this.setState({ clicked: false })
            }
        }
    }

    buttonClick() {
        debugger
        this.setState({ clicked: !this.state.clicked })
    }

    logout() {
        debugger
        this.props.logout().then(this.setState({ logoutClicked: true }))
    }

    render() {
        if (this.props.currentUser) {
            const userCircle = (
                <div className = "current-user-thumbnail" >
                    <p>{this.props.currentUser.username[0].toUpperCase()}</p>
                </div >
            )

            return (
                <>
                <button className="user-button" onClick={this.buttonClick}>
                    {userCircle}
                </button>

                    <div className={this.state.clicked ? "user-dropdown" : "user-dropdown-hidden"} ref={this.node}>
                        <div className="user-info">
                            <div className="user-pic">
                            {userCircle}
                            </div>
                            <div className="user-names">
                                <h3>{this.props.currentUser.username}</h3>
                                <h4>{this.props.currentUser.email}</h4>
                            </div>
                        </div>
                        <br></br>

                        {/* when you click the logout button, it reloads your currrent page so that all props that rely on currentUser are up to date  */}
                        <button onClick={this.logout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <p>Sign Out</p>
                        </button>
                    </div>
                    </>
            )
        } else {
            return (
                <div className="signin-btn">
                    
                    <Link to={'/login'}>
                        <i className="material-icons">account_circle</i>
                        Sign In
                        </Link>
                </div>
            )
        }
    }
}

export default SessionDisplay;
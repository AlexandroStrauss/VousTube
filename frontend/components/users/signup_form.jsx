// should take in username, email, AND password

import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            showPwd: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        <Redirect to={`/users/${user.id}`} />
    }

    render() {
        return (
            <div className="toplevel-signup">
            <div className = "signup-form">
                
                <p className="welcoming">Sign Up</p>
                <p className="continue">to continue to VousTube</p>
                <form onSubmit={this.handleSubmit} >
                    <div className="username">
                        <label>Your name</label>
                        <input type="text" placeholder="Your name" value={this.state.username} onChange={this.update('username')} />
                    </div>

                    <div className="email">
                        <label>Your email address</label>
                            <input type="email" placeholder="Your email address" value={this.state.email} onChange={this.update('email')} />
                    </div>


                    <label>Password<input type={this.state.showPwd ? "text" : "password"} placeholder="Password" value={this.state.password} onChange={this.update('password')} /></label>
                    <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                    <div className="bottom-links">
                        <Link to="/login">Sign in instead</Link>
                        <input type="submit" className="submit" value="Next" onClick={this.handleSubmit} />
                    </div>
                </form>
            </div>
            </div>
        )


    }
}

export default SignupForm
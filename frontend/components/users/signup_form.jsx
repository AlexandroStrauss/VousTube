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
        const errors = this.props.errors.map(error => {
            <li>
                {error}
            </li>
        })
        return (
            <div className = "signup-form">
                <h3>Sign Up</h3>
                <h4>to continue to VousTube</h4>
                <ul>
                    {errors}
                </ul>
                <form onSubmit={this.handleSubmit} >
                    <div className="username">
                        <label>Your name</label>
                        <input type="text" value={this.state.username} onChange={this.update('username')} />
                    </div>

                    <div className="email">
                        <label>Your email address</label>
                            <input type="text" value={this.state.email} onChange={this.update('email')} />
                    </div>


                    <label>Password<input type={this.state.showPwd ? "text" : "password"} value={this.state.password} onChange={this.update('password')} /></label>
                    <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                    <input type="submit" value="Next" onClick={this.handleSubmit} />
                </form>
                <Link to="/login">Sign in instead</Link>
            </div>
        )


    }
}

export default SignupForm
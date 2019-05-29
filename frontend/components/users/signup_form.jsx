// should take in username, email, AND password

import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
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
            <div>
                <h3>Sign Up</h3>
                <ul>
                    {errors}
                </ul>
                <form onSubmit={this.handleSubmit} >
                    <label>Your name<input type="text" value={this.state.username} onChange={this.update('username')} /></label>
                    <label>Your email address<input type="text" value={this.state.email} onChange={this.update('email')} /></label>
                    <label>Password<input type="password" value={this.state.password} onChange={this.update('password')} /></label>
                    <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                    <input type="submit" value={this.props.formType} />
                </form>
                <Link to="/login">Sign in instead</Link>
            </div>
        )


    }
}

export default SignupForm
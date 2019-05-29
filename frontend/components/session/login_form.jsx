import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import SignupFormContainer from '../users/signup_form_container';


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            identifier: "",
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
        const user = this.props.currentUser;

        return (
            <div className="login-form">
                <h3>Log In</h3>
                <ul>
                    {errors}
                </ul>

                {/* <div className="usernameForm">
              x  <form onSubmit={this.handleSubmit} >
                    <label>Username:<input type="text" value={this.state.username} onChange={this.update('identifier')} /></label>
                    <label>Password:<input type="password" value={this.state.password} onChange={this.update('password')} /></label>
                    <input type="submit" value={this.props.formType} />
                </form> */}

                
                <Link to="/signup">Create account</Link>

            {/* </div> */}
            </div>
        )


    }

}

export default LoginForm
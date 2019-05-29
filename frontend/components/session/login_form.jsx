import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import SignupFormContainer from '../users/signup_form_container';


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            identifier: "",
            password: "",
            phase: false

        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCheckSubmit = this.handleCheckSubmit.bind(this)
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

    handleCheckSubmit(e) {
        e.preventDefault();
        const identifier = this.state.identifier;
        this.props.check(identifier).then(this.setState({phase: true}))
    }

    render() {
        const errors = this.props.errors.map(error => {
            <li>
                {error}
            </li>
        })

        return (
            <div className={this.state.phase ? "login-form-phase2" : "login-form-phase1"}>
                <ul>
                    {errors}
                </ul>

                <div className="identifierForm">
                    <h3>Sign in</h3>
                    <h4>to continue to VousTube</h4>

                    <form onSubmit={this.handleCheckSubmit} >
                        <label>Email or username<input type="text" value={this.state.identifier} onChange={this.update('identifier')} /></label>
                        <input type="submit" value="Next" />
                    </form>

                    <Link to="/signup">Create account</Link>
                </div>

                <div className="passwordForm">
                    <h3>Welcome</h3>
                    <h4>{this.state.identifier}</h4>
                    <form onSubmit={this.handleSubmit} >
                        <label>Enter your password<input type="password" value={this.state.password} onChange={this.update('password')} /></label>
                        <input type="submit" value="Log in" />
                    </form>
                </div>
            </div>
        )


    }

}

export default LoginForm
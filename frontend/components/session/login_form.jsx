import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import SignupFormContainer from '../users/signup_form_container';


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            identifier: "",
            password: "",
            phase: false,
            showPwd: false,
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
        this.props.check(identifier).then(() => this.setState({phase: true}))
    }

    render() {
        const errors = this.props.errors.map(error => {
            <li>
                {error}
            </li>
        })

        return (
            <div className={this.state.phase ? "login-phase2" : "login-phase1"}>
                <ul>
                    {errors}
                </ul>

                <div className="form-identifier">
                    <p className="welcoming">Sign in</p>
                    <p className="continue">to continue to VousTube</p>

                    <form onSubmit={this.handleCheckSubmit} >
                        <div className="identifier">
                        <input type="text" value={this.state.identifier} onChange={this.update('identifier')} />
                        <label>Email or username</label>
                        </div>

                        <div className="bottom-links">
                            <Link to="/signup">Create account</Link>
                        <input type="submit" className="submit" value="Next" />
                        </div>

                    </form>

                </div>

                <div className="form-password">
                    <p className="welcoming">Welcome</p>
                    <p className="identifier-info">{this.state.identifier}</p>
                    <form onSubmit={this.handleSubmit} >
                        <div className="password">
                            <input type={this.state.showPwd ? "text" : "password"} value={this.state.password} onChange={this.update('password')} />
                        <label>Enter your password</label>
                        </div>

                        <div className="bottom-links">
                        <p></p>
                        <input type="submit" className="submit" value="Next" />
                        </div>
                    </form>
                </div>
            </div>
        )


    }

}

export default LoginForm
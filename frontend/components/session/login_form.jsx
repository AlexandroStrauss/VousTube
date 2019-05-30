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
            idError: false,
            pwdError: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckSubmit = this.handleCheckSubmit.bind(this);
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(() => console.log('success'), err => this.setState({ pwdError: true }));
        <Redirect to={`/users/${user.id}`} />
    }

    handleCheckSubmit(e) {
        e.preventDefault();
        const identifier = this.state.identifier;
        this.props.check(identifier).then(() => this.setState({phase: true}), err => this.setState({idError: true}));
    }

    render() {
        // // debugger
        // let idError = false
        // if (this.props.errors[0]) {
        //     idError = true;
        // }

        return (
            <div className="toplevel-login">
                <div className={this.state.phase ? "login-phase2" : "login-phase1"}>

                    <div className="form-identifier">
                        <p className="welcoming">Sign in</p>
                        <p className="continue">to continue to VousTube</p>

                        <form onSubmit={this.handleCheckSubmit} >
                            <div className={this.state.idError ? "floating-label-error" : "floating-label"}>
                                <input type="text" placeholder="Email or username" value={this.state.identifier} onChange={this.update('identifier')} />
                                <label>Email or username</label>

                                {this.state.idError ?
                                    <div className="error">
                                        <img src= "/assets/caution_symbol.png" height="20" width="20" />
                                        <p>Could not find username or email</p>
                                    </div>
                                    :
                                    <> </>
                                }
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
                                <div className={this.state.pwdError ? "floating-label-error" : "floating-label"}>
                                
                                {/* <Link to="/login" onClick={this.setState({phase:false})}>Create account</Link> */}
                                <input type={this.state.showPwd ? "text" : "password"} value={this.state.password} onChange={this.update('password')} />
                                <label>Enter your password</label>
                                {this.state.pwdError ?
                                    <div className="error">
                                        <img src="/assets/caution_symbol.png" height="20" width="20" />
                                        <p>Wrong password. Try again.</p>
                                    </div>
                                    :
                                    <> </>
                                }

                            </div>

                            <div className="bottom-links">
                            <p></p>
                            <input type="submit" className="submit" value="Next" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm;
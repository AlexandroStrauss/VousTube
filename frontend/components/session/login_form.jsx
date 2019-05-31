import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

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
            submitted: false,
            checked: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckSubmit = this.handleCheckSubmit.bind(this);
        this.flipBack = this.flipBack.bind(this);
    }

    update(field) {
        if (this.identifierEmpty()) {
            this.setState({checked: false})
        }

        if (this.pwdEmpty()) {
            this.setState({submitted: false})
        }

        return (e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(() => console.log('success'), err => this.setState({ pwdError: true, submitted: true}));
        <Redirect to={`/users/${user.id}`} />
    }

    handleCheckSubmit(e) {
        e.preventDefault();
        const identifier = this.state.identifier;
        this.props.check(identifier).then(() => this.setState({phase: true}), err => this.setState({idError: true, checked: true}));
    }

    identifierEmpty() {
        if (this.state.identifier === "" && this.state.checked) {
            return true
        } else {
            return false
        }
    }

    flipBack() {
        this.setState({ phase: false })
    }
    
    pwdEmpty() {
        if (this.state.password === "" && this.state.submitted) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div className="toplevel-login">
                <div className={this.state.phase ? "login-phase2" : "login-phase1"}>

                    <div className="form-identifier">
                        <p className="welcoming">Sign in</p>
                        <p className="continue">to continue to VousTube</p>

                        <form onSubmit={this.handleCheckSubmit} >
                            <div className={this.state.idError ? "floating-label-error" : "floating-label"}>
                                <input type="text" id="identifier" value={this.state.identifier} onChange={this.update('identifier')} />
                                <label for="identifier">Email or username</label>

                                {this.state.idError ? 
                                    (this.identifierEmpty() ?
                                        <div className="error">
                                            <i class="material-icons md-12">error</i>
                                            <p>Enter an email or username</p>
                                        </div>
                                    :
                                        <div className="error">
                                            <i class="material-icons md-12">error</i>
                                            <p>Couldn't find your email or username</p>
                                        </div>)
                                    :
                                        <> </>
                                }
                            </div>

                            <div className="space-maker">

                            </div>

                            <div className="bottom-links">
                                <Link to="/signup">Create account</Link>
                                <input type="submit" className="submit" value="Next" />
                            </div>
                        </form>
                    </div>

                    <div className="form-password">
                        <p className="welcoming">Welcome</p>
                        <button className="identifier-info" onClick={() => this.flipBack()}>
                            <i class="material-icons md-16">account_circle</i>
                            <p>{this.state.identifier}</p>
                            <i class="material-icons">keyboard_arrow_down</i>
                        </button>
                        <div class="space-40px">

                        </div>
                        <form onSubmit={this.handleSubmit} >
                                <div className={this.state.pwdError ? "floating-label-error" : "floating-label"}>
                                    <input id="pwd" type={this.state.showPwd ? "text" : "password"} value={this.state.password} onChange={this.update('password')} />
                                    <label for="pwd">Enter your password</label>

                                {this.state.pwdError ?
                                    (this.pwdEmpty() ?
                                        <div className="error">
                                            <i class="material-icons md-12">error</i>
                                            <p>Enter a password</p>
                                        </div>
                                        :
                                        <div className="error">
                                            <i class="material-icons md-12">error</i>
                                            <p>Wrong password. Try again.</p>
                                        </div>)
                                    :
                                    <> </>
                                }
                            </div>

                            <div className="space-maker">

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


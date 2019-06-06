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
            showPwd: false,
            submitted: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(this.setState({submitted: true}));
        <Redirect to={`/users/${user.id}`} />
    }

    isEmpty(string) {
        if (string === "" && this.state.submitted) {
            return true
        } else {
            return false
        }
    }

    passwordShort() {
        if (this.state.password.length < 8 && this.state.submitted){
            return true
        } else {
            return false
        }
    }

    passwordError() {
        if (this.state.password.length < 8 && this.state.submitted) {
            if (this.state.password === "") {
                return (
                    <div className="error">
                        <i class="material-icons md-12">error</i>
                        <p>Enter a password</p>
                    </div>
                )
            } else {
                return (
                    <div className="error">
                        <i class="material-icons md-12">error</i>
                        <p>Use 8 characters or more for your password</p>
                    </div>
                )
            }
        } else {
        return (
            <p class="chars-warning">Use 8 or more characters with a mix of letters, numbers & symbols</p>
        )
        }
    }

    render() {
        return (
            <div className="background-color">
            <div className="toplevel-signup">
            <div className="signup-form">
                
                <p className="welcoming">Create your VousTube Account</p>
                <p className="continue">to continue to VousTube</p>
                <form onSubmit={this.handleSubmit} >
                        <div className={this.isEmpty(this.state.username) ? "floating-label-error" : "floating-label"}>
                                <input id="name" type="text" required="required" value={this.state.username} onChange={this.update('username')} />
                            <label for="name">Your name</label>

                            {this.isEmpty(this.state.username) ?
                                <div className="error">
                                    <i class="material-icons md-12">error</i>
                                    <p>Enter a username</p>
                                </div>
                                :
                                <> </>
                            }
                    </div>

                        <div className={this.isEmpty(this.state.email) ? "floating-label-error" : "floating-label"}>                        
                                <input id="email" type="text" required="required" value={this.state.email} onChange={this.update('email')} />
                            <label for="email">Your email address</label>

                            {this.isEmpty(this.state.email) ?
                                <div className="error">
                                    <i class="material-icons md-12">error</i>
                                    <p>Choose an email address</p>
                                </div>
                                :
                                <> </>
                            }
                    </div>

                        <div className={this.passwordShort() ? "floating-label-error" : "floating-label"}>                        
                                <input id="pwd" type={this.state.showPwd ? "text" : "password"} required="required" value={this.state.password} onChange={this.update('password')} />
                            <label for="pwd">Password</label>

                            {this.passwordError()} 
                    </div>
                    
                    <div className="bottom-links">
                        <Link to="/login">Sign in instead</Link>
                        <input type="submit" className="submit" value="Next" onClick={this.handleSubmit} />
                    </div>
                </form>
            </div>
            </div>
            </div>
        )
    }
}

export default SignupForm

{/* () ?
                                this.isEmpty(this.state.password) ?
                                    <div className="error">
                                        <img src="/assets/caution_symbol.png" height="20" width="20" />
                                        <p>Enter a password</p>
                                    </div>
                                :
                                    <div className="error">
                                        <img src="/assets/caution_symbol.png" height="20" width="20" />
                                        <p>Use 8 characters or more for your password</p>
                                    </div>                                    
                             :   <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                            } */}

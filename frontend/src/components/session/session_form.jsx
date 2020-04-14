import React from 'react';
import { Link } from 'react-router-dom'
import './session.css'
import logo from '../../assets/logo.png'

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
    }

    handleChange(type) {
        return e => this.setState({ [type]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user)
            // .then(() => this.props.history.push("/main"))
    }

    clearErrors(e) {
        this.props.clearErrors();
    }

    render() {
        const typeOfForm = this.props.formType === "signup" ? "Sign Up" : "Log In"
        const toOtherForm = this.props.formType === "login" ? (
            <Link to="/register">New? Sign Up!</Link>
        ) : (
            <Link to="/login">Returning? Login!</Link>
        );

        const confirmPassword = this.props.formType === "signup" ? (
            <label className="confirm-password-label">Confirm: 
                <input 
                    type="password" 
                    onChange={this.handleChange("password2")} 
                    value={this.state.password2}
                    placeholder="Confirm Password"
                    className="confirm-session-input"
                />
            </label>
        ) : (
            null
        )

        let usernameErrors = this.props.formType === "signup" ? 
            this.props.errors.handle : this.props.errors.username;
        let passwordErrors = this.props.errors.password;
        let password2Errors = this.props.errors.password2;
        let confirmPasswordClass = this.props.formType === "signup" ?
            'confirm-password-label' : 'confirm-password-label login-hide-confirmation'
        let confirmPasswordErrorsClass = this.props.formType === "signup" ?
            'session-errors' : 'session-errors login-hide-confirmation'

        return (

            <div className="home-page">
                <Link to="/">
                    <img className="home-logo-image" src={logo} alt="logo"/>
                </Link> 
                <div className="session-page-session-form">
                    <div className="session-form">
                        <form>
                            <label className="username-label">Username: 
                                <input 
                                    type="text" 
                                    onChange={this.handleChange("username")} 
                                    value={this.state.username}
                                    placeholder="Username"
                                    className="session-inputs"
                                />
                            </label>
                            <div className="session-errors">
                                {usernameErrors}
                            </div>
                            <br/>

                            <label className="password-label">Password: 
                                <input 
                                    type="password" 
                                    onChange={this.handleChange("password")} 
                                    value={this.state.password}
                                    placeholder="Password"
                                    className="session-inputs"
                                />
                            </label>
                            <div className="session-errors">
                                {passwordErrors}
                            </div>
                            <br/>
                            <label className={confirmPasswordClass}>Confirm:
                                <input
                                    type="password"
                                    onChange={this.handleChange("password2")}
                                    value={this.state.password2}
                                    placeholder="Confirm Password"
                                    className="confirm-session-input"
                                />
                            </label>
                            <div className={confirmPasswordErrorsClass}>
                                {password2Errors}
                            </div>
                            <div className="session-login-signup-buttons">
                                <button onClick={this.handleSubmit} className="session-button">
                                    {typeOfForm}
                                </button>
                                <button onClick={this.props.clearErrors} className="switch-session-button">
                                    {toOtherForm}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default SessionForm;
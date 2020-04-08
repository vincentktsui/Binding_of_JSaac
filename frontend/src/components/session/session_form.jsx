import React from 'react';
import { Link } from 'react-router-dom'
import './session.css'
import logo from '../../assets/logo.png'

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            username: "",
            password: "",
            password2: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.clearSessionErrors();
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

    render() {
        const typeOfForm = this.props.formType === "signup" ? "Sign Up" : "Log In"
        const toSignUpPage = this.props.formType === "login" ? (
            <Link to="/register" className="login-signup-button">Sign Up</Link>
        ) : (
            <Link to="/" className="session-home-button">Cancel</Link>
        )

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

        console.log(this.props.errors)

        const errors = Object.values(this.props.errors).map( (error) => {
            return <li>{error}</li>
        })
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
                            <br/>
                            {confirmPassword}
                            <ul>
                                {errors}
                            </ul>
                            <div className="session-login-signup-buttons">
                                <button onClick={this.handleSubmit} className="session-button">
                                    {typeOfForm}
                                </button>
                                {toSignUpPage}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default SessionForm;
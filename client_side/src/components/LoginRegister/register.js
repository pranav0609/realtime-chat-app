import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions';
import background from "./signup.png";

class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        errors: [],
    };

    displayErrors = errors => 
    errors.map((error, i) => <p key={i}>
        {error}
    </p>)

    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)) {
            error = { message: "fill in all the details" }
            this.setState({errors: errors.concat(error)})
        } else if(!this.isPasswordValid(this.state)) {
            error = { message: "password not valid" };
            this.setState({ errors: errors.concat(error) });
        } else {
            return true;
        }
    }

    isPasswordValid = ({ password, passwordConfirm }) => {
        if( password.length < 6 || passwordConfirm.length < 6 ) {
            return false;
        }
        else if(password !== passwordConfirm) {
            return false;
        }
        else {
            return true;
        }
    }

    isFormEmpty = ({ name, email, password, passwordConfirm }) => {
        return (
            !name.length ||
            !email.length ||
            !password.length ||
            !passwordConfirm.length
        )
    }
    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }
        //console.log(dataToSubmit);
        if(this.isFormValid()) {
            this.setState({ errors: [] })
            this.props.dispatch(registerUser(dataToSubmit))
            .then(response => {
                //console.log(response);
                if(response.payload.success) {
                    this.props.history.push("/login");
                } else {
                    this.setState({ errors: this.state.errors.concat("could not send data to DB") })
                }
            })
            .catch(err => {
                this.setState({ errors: this.state.errors.concat(err) })
            })
        } else {
            this.setState({
                errors: this.state.errors.concat("form not valid")
            })
        }
        };

    render() {
        return (
            <div className="container" style={{ 
                backgroundImage: `url(${background})`
                }}>
                <h2>
                    Sign Up
                </h2>
                <div className="row">
                    <form className="col s12">
                        
                        <div className="row">
                        <div className="input field col s12">
                        <input 
                                name= "name"
                                value={this.state.name}
                                onChange={e => this.handleChange(e)}
                                id="name"
                                type="text"
                                className="validate"
                            />
                            <label htmlFor="name"> Name </label>
                            <span 
                                className="helper-text"
                                data-error="wrong type of email"
                                data-success="right"
                            />
                        </div>
                            
                        </div>

                        <div className="row">
                            <div className="input field col s12">
                            <input 
                                name= "email"
                                value={this.state.email}
                                onChange={e => this.handleChange(e)}
                                id="email"
                                type="email"
                                className="validate"
                            />
                            <label htmlFor="email"> email </label>
                            <span 
                                className="helper-text"
                                data-error="wrong"
                                data-success="right"
                            />
                            </div>

                        </div>

                        <div className="row">
                            <div className="input field col s12">
                            <input 
                                name= "password"
                                value={this.state.password}
                                onChange={e => this.handleChange(e)}
                                id="password"
                                type="password"
                                className="validate"
                            />
                            <label htmlFor="password"> password </label>
                            <span 
                                className="helper-text"
                                data-error="wrong"
                                data-success="right"
                            />
                            </div>

                        </div>

                        <div className="row">
                            <div className="input field col s12">
                            <input 
                                name= "passwordConfirm"
                                value={this.state.passwordConfirm}
                                onChange={e => this.handleChange(e)}
                                id="passwordConfirm"
                                type="password"
                                className="validate"
                            />
                            <label htmlFor="passwordConfirm"> passwordConfirm </label>
                            <span 
                                className="helper-text"
                                data-error="wrong"
                                data-success="right"
                            />
                            </div>

                        </div>

                            {this.state.errors.length > 0 && (
                                <div>
                                    {this.displayErrors(this.state.errors)}
                                </div>
                            )}

                            <div className="row">
                                <div className="col s6">
                                    <button
                                        className="btn waves-effect red lighten-2"
                                        type="submit"
                                        name="action"
                                        onClick={this.submitForm}
                                    >
                                            Submit
                                    </button>
                                </div>

                            </div>
                    </form>
                </div>
                
            </div>
        );
    }
}

export default connect()(Register);
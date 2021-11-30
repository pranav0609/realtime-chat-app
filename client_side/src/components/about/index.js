import React, { Component } from 'react';
import { connect } from 'react-redux';
import { feedbackUser } from '../../actions/user_actions';

class About extends Component {

    state = {
        name: "",
        email: "",
        Message: "",
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
        }
        else {
            return true;
        }
    }

    

    isFormEmpty = ({ name, email, Message }) => {
        return (
            !name.length ||
            !email.length ||
            !Message.length 
        )
    }
    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            name: this.state.name,
            email: this.state.email,
            Message: this.state.Message
        }
        //console.log(dataToSubmit);
        if(this.isFormValid()) {
            this.setState({ errors: [] })
            this.props.dispatch(feedbackUser(dataToSubmit))
            .then(response => {
                console.log(response);
                if(response.payload.success) {
                    this.props.history.push("/");
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
            <div>
                <center>
                    <h1>
                    About Us!
                    </h1>
                </center>
                <div>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique erat ac massa tristique tristique. Curabitur sit amet est nunc. Aenean lacus elit, commodo sed libero vel, pellentesque egestas velit. In eu tellus posuere, feugiat nulla vel, pellentesque ante. In luctus auctor lacus, nec vulputate urna condimentum in. Donec ut justo sodales, pulvinar nulla vitae, bibendum risus. Nam elit velit, luctus sit amet erat at, vestibulum tempus mi. Duis efficitur sit amet justo finibus elementum. Nam consequat, urna in pharetra scelerisque, orci quam pharetra risus, quis ultricies ligula nisl non leo. Fusce fringilla pulvinar quam, non malesuada metus sollicitudin ut. Nullam at mi nibh. Duis ac mi ligula. Aliquam in purus diam. Quisque nec eleifend purus. Mauris vitae rhoncus dolor.
</p><p>
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed facilisis nisl dui, at lobortis ligula vestibulum auctor. Suspendisse eu diam sed sem porta semper id vel turpis. Nullam ornare, augue sit amet euismod mattis, tellus tortor fringilla metus, non euismod arcu lorem eget neque. Nam placerat ex et orci finibus consequat mollis sit amet quam. Sed sed elit quis lorem tempus posuere. Etiam pharetra tellus quis arcu dignissim mollis. Donec in hendrerit dui. Morbi quis enim ac nibh faucibus dignissim id in dolor. Nunc euismod lorem in velit auctor gravida. Praesent vel tristique sapien, eget ornare nisl.
                    </p>
                </div>
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
                                name= "Message"
                                defaultValue={this.state.Message}
                                onChange={e => this.handleChange(e)}
                                id="message"
                                type="text"
                                className="validate"
                            />
                            <label htmlFor="message"> Message </label>
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

export default connect()(About);
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { registerUser } from '../actions/register';


class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();

        const { dispatch } = this.props;

        let data = {
            username: this.username.value,
            email: this.email.value,
            first_name: this.firstName.value,
            last_name: this.lastName.value,
            password: this.password.value,
        };

        dispatch(registerUser(data));
    }

    render() {
        return (
            <div>
                <h2>Sign up!</h2>
                <form method="post" onSubmit={this._handleSubmit}>
                    <fieldset>
                        <label htmlFor="username">Username</label>
                        <input ref={(c) => { this.username = c; }} id="username" name="username" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="email">E-mail</label>
                        <input ref={(c) => { this.email = c; }} id="email" name="email" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="first_name">First name</label>
                        <input ref={(c) => { this.firstName = c; }} id="firstName" name="first_name" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="last_name">Lastname</label>
                        <input ref={(c) => { this.lastName = c; }} id="lastName" name="last_name" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="password">Password</label>
                        <input ref={(c) => { this.password = c; }} id="password"name="password" />
                    </fieldset>

                    <button>Register</button>
                </form>
                <Link to="/sign-in">Sign in</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: null,
});

export default connect(mapStateToProps)(SignUp);

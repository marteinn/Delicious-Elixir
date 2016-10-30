import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/session';


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();

        const { dispatch } = this.props;

        const data = {
            email: this.email.value,
            password: this.password.value,
        }

        console.log('handle submit');

        dispatch(signIn(data));
    }

    render() {
        return (
            <div>
                <h2>Sign in!</h2>
                <form method="post" onSubmit={this._handleSubmit}>
                    <fieldset>
                        <label htmlFor="email">email</label>
                        <input ref={(c) => { this.email = c; }} id="email" name="email" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Password</label>
                        <input ref={(c) => { this.password = c; }} id="password"name="password" />
                    </fieldset>
                    <button>Sign in</button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    errors: null,
});

export default connect(mapStateToProps)(SignIn);

import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/session';
import ErrorList from '../components/ErrorList/ErrorList';


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
        };

        dispatch(signIn(data));
    }

    render() {
        const { currentUser } = this.props;

        return (
            <div>
                <h2>Sign in!</h2>
                <form method="post" onSubmit={this._handleSubmit}>
                    <ErrorList errors={this.props.errors} />
                    <fieldset>
                        <label htmlFor="email">email</label>
                        <input ref={(c) => { this.email = c; }} id="email" name="email" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Password</label>
                        <input ref={(c) => { this.password = c; }} id="password" name="password" type="password" />
                    </fieldset>
                    <button>Sign in</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.session.errors,
        currentUser: state.session.currentUser,
    };
};

SignIn.propTypes = {
    currentUser: React.PropTypes.object,
    errors: React.PropTypes.array,
    dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps)(SignIn);

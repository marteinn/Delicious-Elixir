import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { registerUser } from '../../actions/register';
import MessageList from '../MessageList';

class SignUpForm extends React.Component {
    static propTypes = {
        errors: React.PropTypes.array,
        dispatch: React.PropTypes.func,
    }

    static defaultProps = {
        errors: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        const data = {
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
                <form method="post" onSubmit={this.handleSubmit}>
                    <MessageList errors={this.props.errors} />

                    <h2 className="Form__Title">Sign up</h2>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="username">Username</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.username = c; }} id="username" name="username" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="email">E-mail</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.email = c; }} id="email" name="email" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="first_name">First name</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.firstName = c; }} id="firstName" name="first_name" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="last_name">Lastname</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.lastName = c; }} id="lastName" name="last_name" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="password">Password</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.password = c; }} id="password" name="password" type="password" />
                        </div>
                    </div>

                    <nav className="Modal__Actions">
                        <div className="Modal__ActionsPrimary">
                            <Link className="Modal__Action Modal__Action--Neutral" to="/sign-in">Already a member? Sign in</Link>
                            <button className="Modal__Action Modal__Action--Positive Modal__Action--Button">Sign up</button>
                        </div>
                    </nav>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let errors = state.register.errors;

    errors = errors.map((error) => {
        const key = Object.keys(error)[0];
        const msg = error[key];
        return `${key}: ${msg}`;
    });

    return {
        errors,
    };
};


export { SignUpForm };
export default connect(mapStateToProps)(SignUpForm);

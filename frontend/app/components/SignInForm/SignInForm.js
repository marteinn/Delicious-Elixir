import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signIn } from '../../actions/session';
import MessageList from '../MessageList';


class SignInForm extends React.Component {
    static propTypes = {
        currentUser: React.PropTypes.object,
        errors: React.PropTypes.array,
        dispatch: React.PropTypes.func,
    };

    handleSubmit = (e) => {
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
                <form className="Form" onSubmit={this.handleSubmit}>
                    <MessageList errors={this.props.errors} />

                    <h2 className="Form__Title">Sign in</h2>

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
                            <label className="Form__FieldLabel" htmlFor="password">Password</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.password = c; }} id="password" name="password" type="password" />
                        </div>
                    </div>
                    <nav className="Modal__Actions">
                        <div className="Modal__ActionsPrimary">
                            <Link className="Modal__Action Modal__Action--Neutral" to="/sign-up">Not a member? Sign up</Link>
                            <button className="Modal__Action Modal__Action--Positive Modal__Action--Button">Sign in</button>
                        </div>
                    </nav>
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


export { SignInForm };
export default connect(mapStateToProps)(SignInForm);

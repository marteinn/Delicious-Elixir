import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../MessageList';

class ChangePasswordForm extends React.Component {
    static propTypes = {
        errors: React.PropTypes.object,
        dispatch: React.PropTypes.func,
    }

    static defaultProps = {
        success: false,
        errors: {},
    };

    handleSubmit = (e) => {
        console.log('handle submit');
        e.preventDefault();

        this.submitForm();
    }

    submitForm = () => {
        const { dispatch } = this.props;

        const data = {
            first_name: this.firstName.value,
            last_name: this.lastName.value,
            description: this.description.value,
            url: this.url.value,
        };

        //dispatch(createLink(data));
    }

    render() {
        return (
            <div className="ChangePasswordForm">
                <h2 className="Form__Title">Change password</h2>

                <form className="Form" onSubmit={this.handleSubmit}>
                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="password">Current password</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.password = c; }} name="password" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="newPassword">New password</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.newPassword = c; }} name="newPassword" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="newPassword2">Repeat New Password</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.newPassword2 = c; }} name="newPassword2" />
                        </div>
                    </div>

                    <nav className="Modal__Actions">
                        <div className="Modal__ActionsPrimary">
                            <button className="Modal__Action Modal__Action--Positive Modal__Action--Button">Save changes</button>
                        </div>
                    </nav>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //success: state.linkStatus.success,
        //errors: state.linkStatus.errors,
    };
};

export default connect(mapStateToProps)(ChangePasswordForm);

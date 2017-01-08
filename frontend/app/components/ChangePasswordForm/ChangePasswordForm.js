import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import MessageList from '../MessageList';
import { changePassword } from '../../actions/settings';

class ChangePasswordForm extends React.Component {
    static propTypes = {
        errors: React.PropTypes.array,
        dispatch: React.PropTypes.func,
        loadState: React.PropTypes.object,
    }

    static defaultProps = {
        success: false,
        errors: [],
    };

    state = {
        password: "",
        newPassword: "",
        newPassword2: "",
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.submitForm();
    }

    handleFieldChange = (e) => {
        e.preventDefault();

        let target = e.currentTarget;

        this.setState({
            [target.name]: target.value,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { success } = nextProps;

        if (success) {
            this.setState({
                password: "",
                newPassword: "",
                newPassword2: "",
            });
        }
    }

    submitForm = () => {
        const { dispatch } = this.props;

        const data = {
            current_password: this.state.password,
            new_password: this.state.newPassword,
        };

        dispatch(changePassword(data));
    }

    render() {
        const { loading, success, errors } = this.props;
        let messageErrors = errors;

        if (errors.length && _.isObject(errors[0])) {
            messageErrors = _.map(errors, (error, key) =>
                `Error: ${key} ${error[0]}`
            );
        }

        return (
            <div className="ChangePasswordForm">
                <form className="Form" onSubmit={this.handleSubmit}>
                    <MessageList errors={messageErrors} />

                    <h2 className="Form__Title">Change password</h2>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="password">Current password</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" value={this.state.password} onChange={this.handleFieldChange} name="password" type="password" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="newPassword">New password</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" value={this.state.newPassword} onChange={this.handleFieldChange} name="newPassword" type="password" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="newPassword2">Repeat New Password</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" value={this.state.newPassword2} onChange={this.handleFieldChange} name="newPassword2" type="password" />
                        </div>
                    </div>

                    <nav className="Modal__Actions">
                        <div className="Modal__ActionsPrimary">

                            {!loading ?
                                <button className="Modal__Action Modal__Action--Positive Modal__Action--Button">Save changes</button>
                                :
                                <button className="Modal__Action Modal__Action--Positive Modal__Action--Button">Saving...</button>
                            }
                        </div>
                    </nav>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { errors, success, loading } = state.loadStatus.password;
    return {
        errors,
        success,
        loading,
    };
};

export { ChangePasswordForm };
export default connect(mapStateToProps)(ChangePasswordForm);

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import MessageList from '../MessageList';
import { updateProfile } from '../../actions/settings';

class EditProfileForm extends React.Component {
    static propTypes = {
        user: React.PropTypes.object,
        loading: React.PropTypes.bool,
        errors: React.PropTypes.array,
        success: React.PropTypes.bool,
        dispatch: React.PropTypes.func,
    };

    static defaultProps = {
        user: {},
        success: false,
        loading: false,
        errors: [],
    };

    constructor(props) {
        super(props);

        const { user } = props;

        this.state = {
            firstName: user.first_name,
            lastName: user.last_name,
            description: user.description,
            url: user.url,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.submitForm();
    }

    handleFieldChange = (e) => {
        e.preventDefault();

        const target = e.currentTarget;

        this.setState({
            [target.name]: target.value,
        });
    }

    submitForm = () => {
        const { dispatch } = this.props;

        const data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            description: this.state.description,
            url: this.state.url,
        };

        dispatch(updateProfile(data));
    }

    render() {
        const { loading, success, errors } = this.props;
        let messageErrors = errors;
        let messageInfos = [];

        if (errors.length && _.isObject(errors[0])) {
            messageErrors = _.map(errors, (error, key) =>
                `Error: ${key} ${error[0]}`
            );
        }

        if (success) {
            messageInfos = ['Your profile has been updated'];
        }

        return (
            <div className="EditProfileForm">

                <form className="Form" onSubmit={this.handleSubmit}>
                    <MessageList errors={messageErrors} infos={messageInfos} />

                    <h2 className="Form__Title">Edit profile</h2>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="firstName">First name</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" onChange={this.handleFieldChange} name="firstName" value={this.state.firstName} />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="lastName">Last name</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" onChange={this.handleFieldChange} name="lastName" value={this.state.lastName} />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="description">Description</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" onChange={this.handleFieldChange} name="description" value={this.state.description} />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="url">Website</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" onChange={this.handleFieldChange} name="url" value={this.state.url} />
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
    const user = state.session.currentUser;
    const { errors, success, loading } = state.loadStatus.profile;

    return {
        user,
        errors,
        success,
        loading,
    };
};

export { EditProfileForm };
export default connect(mapStateToProps)(EditProfileForm);

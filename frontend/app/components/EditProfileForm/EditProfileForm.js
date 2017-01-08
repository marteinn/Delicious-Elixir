import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../MessageList';
import { updateProfile } from '../../actions/settings';

class EditProfileForm extends React.Component {
    static propTypes = {
        user: React.PropTypes.object,
        loading: React.PropTypes.bool,
        errors: React.PropTypes.object,
        success: React.PropTypes.bool,
        dispatch: React.PropTypes.func,
    };

    static defaultProps = {
        user: {},
        success: false,
        loading: false,
        errors: {},
    };

    handleSubmit = (e) => {
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

        dispatch(updateProfile(data));
    }

    render() {
        const { user, loading, errors, success } = this.props;

        return (
            <div className="EditProfileForm">
                <h2 className="Form__Title">Edit profile</h2>

                <form className="Form" onSubmit={this.handleSubmit}>
                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="firstName">First name</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.firstName = c; }} name="firstName" defaultValue={user.first_name} />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="lastName">Last name</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.lastName = c; }} name="lastName" defaultValue={user.last_name} />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="description">Description</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.description = c; }} name="description" defaultValue={user.description} />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="url">Website</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.url = c; }} name="url" defaultValue={user.url}/>
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

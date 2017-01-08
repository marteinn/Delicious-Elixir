import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../MessageList';
import { updateProfile } from '../../actions/settings';

class EditProfileForm extends React.Component {
    static propTypes = {
        errors: React.PropTypes.object,
        dispatch: React.PropTypes.func,
    };

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

        dispatch(updateProfile(data));
    }

    render() {
        return (
            <div className="EditProfileForm">
                <h2 className="Form__Title">Edit profile</h2>

                <form className="Form" onSubmit={this.handleSubmit}>
                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="firstName">First name</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.firstName = c; }} name="firstName" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="lastName">Last name</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.lastName = c; }} name="lastName" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="description">Description</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.description = c; }} name="description" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="url">Website</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.url = c; }} name="url" />
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

export default connect(mapStateToProps)(EditProfileForm);

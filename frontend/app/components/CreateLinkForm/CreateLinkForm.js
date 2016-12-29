import React from 'react';
import { connect } from 'react-redux';
import { createLink } from '../../actions/links';


class CreateLinkForm extends React.Component {
    static propTypes = {
        dispatch: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
    }

    _handleSubmit = (e) => {
        e.preventDefault();

        this._submitForm();
    }

    _handleCancelClick = () => {
        const { onRequestClose } = this.props;

        onRequestClose();
    }

    _submitForm = () => {
        const { dispatch } = this.props;

        const data = {
            title: this.title.value,
            url: this.url.value,
            description: this.description.value,
        };

        dispatch(createLink(data));
    }

    render() {
        return (
            <div>
                <form className="CreateLinkForm Form" onSubmit={this._handleSubmit}>
                    <h2 className="Form__Title">Add link</h2>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="title">Title</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.title = c; }} name="title" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="url">Url</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.url = c; }} name="url" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="description">Comment</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.description = c; }} name="description" />
                        </div>
                    </div>

                    <nav className="Modal__Actions">
                        <div className="Modal__ActionsSecondary">
                            <a className="Modal__Action Modal__Action--Negative" href="#" onClick={this._handleCancelClick}>Cancel</a>
                        </div>
                        <div className="Modal__ActionsPrimary">
                            <a className="Modal__Action Modal__Action--Neutral" href="#" onClick={this._handleCancelClick}>Cancel</a>
                            <button className="Modal__Action Modal__Action--Positive Modal__Action--Button" onClick={this._handleSaveLink}>Create link</button>
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

export default connect(mapStateToProps)(CreateLinkForm);

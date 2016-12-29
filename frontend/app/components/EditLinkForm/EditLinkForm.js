import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createLink } from '../../actions/links';

class EditLinkForm extends React.Component {
    static propTypes = {
        errors: React.PropTypes.object,
        dispatch: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
    }

    static defaultProps = {
        success: false,
        errors: {},
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.success) {
            nextProps.onRequestClose();
        }
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
        const { errors } = this.props;
        const hasErrors = Object.keys(errors).length > 0;

        return (
            <div>
                <form className="EditLinkForm Form" onSubmit={this._handleSubmit}>
                    {hasErrors &&
                        <div>{_.map(errors, (error, key) => <div key={key} className="Form__Alert">Error: {key} {error[0]}</div>)}</div>
                    }

                    <div className="Form__Field Form__Field--First">
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
                        <div className="Modal__ActionsPrimary">
                            <a className="Modal__Action Modal__Action--Neutral" href="#" onClick={this._handleCancelClick}>Cancel</a>
                            <button className="Modal__Action Modal__Action--Positive Modal__Action--Button" onClick={this._handleSaveLink}>Save link</button>
                            </div>
                        </nav>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        success: state.linkStatus.success,
        errors: state.linkStatus.errors,
    };
};

export default connect(mapStateToProps)(EditLinkForm);

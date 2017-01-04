import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { editLink } from '../../actions/links';

class EditLinkForm extends React.Component {
    static propTypes = {
        link: React.PropTypes.object,
        errors: React.PropTypes.object,
        dispatch: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
    }

    static defaultProps = {
        link: null,
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
        const { link, dispatch } = this.props;

        const data = {
            id: link.id,
            title: this.title.value,
            url: this.url.value,
            description: this.description.value,
            private: this.private.checked,
        };

        dispatch(editLink(data));
    }

    render() {
        const { link, errors } = this.props;
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
                            <input className="Form__FieldInput" ref={(c) => { this.title = c; }} defaultValue={link.title} name="title" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="url">Url</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.url = c; }} defaultValue={link.url} name="url" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="description">Comment</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" ref={(c) => { this.description = c; }} defaultValue={link.description} name="description" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <input type="checkbox" className="Form__CheckboxLock" ref={(c) => { this.private = c; }} name="private" defaultChecked={link.private} />
                        <label className="Form__CheckboxLockLabel" data-checkedLabel="Private" htmlFor="private">Public</label>
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

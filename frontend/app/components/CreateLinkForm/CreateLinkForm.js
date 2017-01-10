import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createLink } from '../../actions/links';
import MessageList from '../MessageList';


class CreateLinkForm extends React.Component {
    static propTypes = {
        errors: React.PropTypes.object,
        dispatch: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
    }

    static defaultProps = {
        success: false,
        errors: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            url: '',
            description: '',
            tags: '',
            private: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success) {
            nextProps.onRequestClose();
        }
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

    handleCancelClick = (e) => {
        const { onRequestClose } = this.props;

        e.preventDefault();
        onRequestClose();
    }

    submitForm = () => {
        const { dispatch } = this.props;

        const data = {
            title: this.state.title,
            url: this.state.url,
            tags: this.formatTags(this.state.tags),
            description: this.state.description,
            private: this.private.checked,
        };

        dispatch(createLink(data));
    }

    formatTags(value) {
        return value.split(',').map((x) => _.trim(x));
    }

    render() {
        const { errors } = this.props;
        const messageErrors = _.map(errors, (error, key) => `Error: ${key} ${error[0]}`);

        return (
            <div>
                <form className="CreateLinkForm Form" onSubmit={this.handleSubmit}>
                    <MessageList errors={messageErrors} />

                    <h2 className="Form__Title">Add link</h2>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="title">Title</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" onChange={this.handleFieldChange} value={this.state.title} name="title" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="url">Url</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" onChange={this.handleFieldChange} value={this.state.url} name="url" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="tags">Tags</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" onChange={this.handleFieldChange} value={this.state.tags} name="tags" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <div className="Form__LabelWrap">
                            <label className="Form__FieldLabel" htmlFor="description">Comment</label>
                        </div>
                        <div className="Form__InputWrap">
                            <input className="Form__FieldInput" onChange={this.handleFieldChange} value={this.state.description} name="description" />
                        </div>
                    </div>

                    <div className="Form__Field">
                        <input type="checkbox" className="Form__CheckboxLock" ref={(c) => { this.private = c; }} defaultChecked={this.state.private} name="private" />
                        <label className="Form__CheckboxLockLabel" data-checkedLabel="Private" htmlFor="private">Public</label>
                    </div>

                    <nav className="Modal__Actions">
                        <div className="Modal__ActionsPrimary">
                            <a className="Modal__Action Modal__Action--Neutral" href="#" onClick={this.handleCancelClick}>Cancel</a>
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
        success: state.linkStatus.success,
        errors: state.linkStatus.errors,
    };
};

export default connect(mapStateToProps)(CreateLinkForm);

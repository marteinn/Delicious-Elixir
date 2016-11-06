import React from 'react';
import { connect } from 'react-redux';
import { createLink } from '../../actions/link';


class CreateLinkForm extends React.Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();

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
                <h2>Add link</h2>
                <form className="CreateLinkForm" onSubmit={this._handleSubmit}>
                    <fieldset>
                        <label htmlFor="title">Title</label>
                        <input ref={(c) => { this.title = c; }} name="title" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="url">Url</label>
                        <input ref={(c) => { this.url = c; }} name="url" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="description">Comment</label>
                        <input ref={(c) => { this.description = c; }} name="description" />
                    </fieldset>

                    <button>Add link</button>
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

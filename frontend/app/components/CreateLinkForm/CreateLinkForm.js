import React from 'react';


class CreateLinkForm extends React.Component {
    _handleSubmit(e) {
        e.preventDefault();

        //const { dispatch } = this.props;
    }

    render() {
        return (
            <div>
                <h2>Add link</h2>
                <form className="CreateLinkForm" onSubmit={this._handleSubmit}>
                    <fieldset>
                        <label htmlFor="title">Title</label>
                        <input name="title" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="url">Url</label>
                        <input name="url" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="description">Comment</label>
                        <input name="description" />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default CreateLinkForm;

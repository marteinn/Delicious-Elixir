import React from 'react';
import { connect } from 'react-redux';
import CreateLinkForm from '../components/CreateLinkForm/CreateLinkForm';


class CreateLink extends React.Component {
    render() {
        return (
            <div>
                <p>Create link</p>
                <CreateLinkForm />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(CreateLink);

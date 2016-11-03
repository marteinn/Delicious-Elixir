import React from 'react';
import { connect } from 'react-redux';


class UserDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser } = this.props;

        return (
            <h1>Hello</h1>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.session.currentUser,
    };
};

export default connect(mapStateToProps)(UserDetail);

import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/session';


class SignOut extends React.Component {
    static propTypes = {
        dispatch: React.PropTypes.func,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(signOut());
    }

    render() {
        return (
            <p>You have been logged out</p>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.session.errors,
        currentUser: state.session.currentUser,
    };
};


export default connect(mapStateToProps)(SignOut);

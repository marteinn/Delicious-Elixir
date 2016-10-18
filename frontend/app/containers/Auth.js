import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

class Auth extends React.Component {
    componentDidMount() {
        const { dispatch, currentUser } = this.props;

        dispatch(routeActions.push('/sign-up'));
    }

    render() {
    }
}


Auth.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
});

Auth = connect(mapStateToProps)(Auth);

export default Auth;

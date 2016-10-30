import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Auth extends React.Component {
    componentDidMount() {
        console.log('AUTH?');
        const { dispatch, currentUser } = this.props;
        // dispatch(push('/sign-up'));
    }

    render() {
        // if (!this.props.currentUser) return null;
        return (
            <h1>Logged in!</h1>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(Auth);

/*Auth.propTypes = {*/
    //dispatch: React.PropTypes.func.isRequired,
    //currentUser: React.PropTypes.object.isRequired,
/*};*/

//export default Auth;

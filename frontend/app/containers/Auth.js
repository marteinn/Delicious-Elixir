import React from 'react';
import { connect } from 'react-redux';

class Auth extends React.Component {
    componentDidMount() {
        //const { dispatch } = this.props;
        // dispatch(push('/sign-up'));
    }

    render() {
        const { currentUser } = this.props;

        return (
            <div className="main-container">
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
});


Auth.propTypes = {
    currentUser: React.PropTypes.object,
    children: React.PropTypes.array,
};

export default connect(mapStateToProps)(Auth);

/*Auth.propTypes = {*/
    //dispatch: React.PropTypes.func.isRequired,
    //currentUser: React.PropTypes.object.isRequired,
/*};*/

import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Toolbar/Toolbar';

class Auth extends React.Component {
    render() {
        const { currentUser } = this.props;

        if (!currentUser) {
            return null;
        }

        const activeRoute = this.props.routes[this.props.routes.length - 1];

        return (
            <div className="Auth">
                <Toolbar modifiers="Auth__Toolbar" activeRoute={activeRoute} />
                <div className="Auth__Content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
});

//Auth.propTypes = {
    //currentUser: React.PropTypes.object,
    //children: React.PropTypes.array,
//};

export default connect(mapStateToProps)(Auth);

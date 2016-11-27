import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Toolbar/Toolbar';

class Auth extends React.Component {
    static propTypes = {
        currentUser: React.PropTypes.object.isRequired,
        routes: React.PropTypes.array,
        children: React.PropTypes.array,
    }

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

export default connect(mapStateToProps)(Auth);

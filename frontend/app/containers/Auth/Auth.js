import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Toolbar from '../../components/Toolbar/Toolbar';
import CreateLinkForm from '../../components/CreateLinkForm';
import { showModal, hideModal, modalNames } from '../../actions/modals';

class Auth extends React.Component {
    static propTypes = {
        currentUser: React.PropTypes.object,
        routes: React.PropTypes.array,
        children: React.PropTypes.object,
    }

    handleModalRequestClose = () => {
        const { dispatch } = this.props;
        dispatch(hideModal(modalNames.CREATE_LINK));
    }

    render() {
        const { currentUser, showCreateLinkModal } = this.props;

        if (!currentUser) {
            return null;
        }

        const activeRoute = this.props.routes[this.props.routes.length - 1];

        return (
            <div className="Auth">
                <Modal isOpen={showCreateLinkModal} onRequestClose={this.handleModalRequestClose}>
                    <CreateLinkForm onRequestClose={this.handleModalRequestClose} />
                </Modal>

                <Toolbar modifiers="Auth__Toolbar" activeRoute={activeRoute} />
                <div className="Auth__Content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        showCreateLinkModal: state.modals.createLink.isOpen,
        currentUser: state.session.currentUser,
    }
};

export default connect(mapStateToProps)(Auth);

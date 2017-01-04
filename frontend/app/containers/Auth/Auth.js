import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Toolbar from '../../components/Toolbar/Toolbar';
import CreateLinkForm from '../../components/CreateLinkForm';
import EditLinkForm from '../../components/EditLinkForm';
import { showModal, hideModal, modalNames } from '../../actions/modals';

class Auth extends React.Component {
    static propTypes = {
        currentUser: React.PropTypes.object,
        dispatch: React.PropTypes.func,
        routes: React.PropTypes.array,
        children: React.PropTypes.object,
        showCreateLinkModal: React.PropTypes.bool,
        showEditLinkModal: React.PropTypes.bool,
        editLinkData: React.PropTypes.func,
    }

    handleCreateLinkModalClose = () => {
        const { dispatch } = this.props;
        dispatch(hideModal(modalNames.CREATE_LINK));
    }

    handleEditLinkModalClose = () => {
        const { dispatch } = this.props;
        dispatch(hideModal(modalNames.EDIT_LINK));
    }

    render() {
        const {
            currentUser,
            showCreateLinkModal,
            showEditLinkModal,
            editLinkData,
        } = this.props;

        if (!currentUser) {
            return null;
        }

        const activeRoute = this.props.routes[this.props.routes.length - 1];

        return (
            <div className="Auth">
                <Modal
                    className="Modal"
                    overlayClassName="OverlayModal"
                    isOpen={showCreateLinkModal}
                    contentLabel="Create Link"
                    onRequestClose={this.handleCreateLinkModalClose}
                >
                    <CreateLinkForm onRequestClose={this.handleCreateLinkModalClose} />
                </Modal>

                <Modal
                    className="Modal"
                    overlayClassName="OverlayModal"
                    isOpen={showEditLinkModal}
                    contentLabel="Edit Link"
                    onRequestClose={this.handleCreateLinkModalClose}
                >
                    <EditLinkForm
                        link={editLinkData}
                        onRequestClose={this.handleEditLinkModalClose}
                    />
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
        showEditLinkModal: state.modals.editLink.isOpen,
        editLinkData: state.modals.editLink.data,
        currentUser: state.session.currentUser,
    };
};

export default connect(mapStateToProps)(Auth);

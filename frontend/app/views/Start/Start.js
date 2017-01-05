import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link, Redirect } from 'react-router';
import uri from 'urijs';
import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';


const SECTION_SIGN_UP = 'sign-up';
const SECTION_SIGN_IN = 'sign-in';


class Start extends React.Component {
    static propTypes = {
        showSignIn: React.PropTypes.bool,
        showSignUp: React.PropTypes.bool,
        router: React.PropTypes.object,
    };

    handleModalClose = () => {
        const { router } = this.props;
        router.push('/start');
    }

    render() {
        const { showSignIn, showSignUp } = this.props;

        return (
            <div className="Start">
                <Modal
                    className="Modal"
                    overlayClassName="OverlayModal"
                    isOpen={showSignIn}
                    contentLabel="Sign in"
                    onRequestClose={this.handleModalClose}
                >
                    <SignInForm onRequestClose={this.handleModalClose} />
                </Modal>

                <Modal
                    className="Modal"
                    overlayClassName="OverlayModal"
                    isOpen={showSignUp}
                    contentLabel="Sign up"
                    onRequestClose={this.handleModalClose}
                >
                    <SignUpForm onRequestClose={this.handleModalClose} />
                </Modal>

                <h1>Start view</h1>

                <Link to={'sign-in'}>Sign in</Link>
                <Link to={'sign-up'}>Sign up</Link>
            </div>
        );
    }
}

const mapStateToProps = (state, newState) => {
    const path = uri(newState.location.pathname);
    const section = path.segment(-1);

    return {
        showSignIn: section === SECTION_SIGN_IN,
        showSignUp: section === SECTION_SIGN_UP,
    };
};

export default connect(mapStateToProps)(Start);

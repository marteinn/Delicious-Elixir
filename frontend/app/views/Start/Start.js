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

                <header className="Start__Header">
                    <div className="Start__HeaderLogo">
                        <h2 className="Start__HeaderTitle">Elixir+Delicious</h2>
                    </div>

                    <nav className="Start__HeaderNav">
                        <Link className="Start__HeaderNavItem" to={'sign-in'}>Sign in</Link>
                        <Link className="Start__HeaderNavItem" to={'sign-up'}>Sign up</Link>
                    </nav>
                </header>

                <div className="Start__Hero">
                    <div className="Start__HeroContent">
                        <h1 className="Start__HeroTitle">Aliquam vulputate et diam</h1>
                        <p className="Start__HeroPreamble">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices efficitur risus, a lobortis mauris accumsan sed. — <Link to={'/sign-up'}>Sign up</Link></p>
                    </div>
                </div>

                <footer className="Start__Footer">
                    <div className="Start__FooterColumn">
                        <span className="Start__FooterCopyright">Copyright</span>
                    </div>

                    <div className="Start__FooterColumn">
                        <nav className="Start__FooterNav">
                            <a className="Start__FooterNavItem" href="#">Help</a>
                            <a className="Start__FooterNavItem" href="#">Blog</a>
                        </nav>
                    </div>
                </footer>

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

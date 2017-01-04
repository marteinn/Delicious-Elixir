import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { showModal, hideModal, modalNames } from '../../actions/modals';


class Toolbar extends React.Component {
    static propTypes = {
        currentUser: React.PropTypes.object,
        modifiers: React.PropTypes.string,
        dispatch: React.PropTypes.func,
    };

    handleCreateLinkClick = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;
        dispatch(showModal(modalNames.CREATE_LINK));
    }

    render() {
        const { currentUser, modifiers } = this.props;

        return (
            <nav className={classNames('Toolbar', modifiers)}>

                <ul className="Toolbar__List Toolbar__List--Fixed">
                    <li className="Toolbar__Item">
                        <Link to={'/'} className="Toolbar__Link">Elixir+Delicious</Link>
                    </li>

                    <li className="Toolbar__Item">
                        <input type="" className="Toolbar__Search" placeholder="Search" />
                    </li>

                    {currentUser ?
                        <li className="Toolbar__Item">
                            <Link to={`/users/${currentUser.username}`} activeClassName="Toolbar__Link--Active" className="Toolbar__Link">My links</Link>
                        </li>
                        :
                        <li className="Toolbar__Item">
                            <a href="#" className="Toolbar__Link">Sign in</a>
                        </li>
                    }

                    <li className="Toolbar__Item">
                        <a href="#" className="Toolbar__Link">Network</a>
                    </li>
                    <li className="Toolbar__Item">
                        <a href="#" className="Toolbar__Link">Discover</a>
                    </li>
                    <li className="Toolbar__Item">
                        <a href="#" onClick={this.handleCreateLinkClick} className="Toolbar__Link">Add link</a>
                    </li>

                    {currentUser &&
                        <li className="Toolbar__Item">
                            <a href="#" className="Toolbar__Link">Settings</a>
                        </li>
                    }

                    {currentUser &&
                        <li className="Toolbar__Item">
                            <Link to={'/sign-out'} className="Toolbar__Link">Sign Out</Link>
                        </li>
                    }
                </ul>
            </nav>
        );
    }
}


const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
});


export default connect(mapStateToProps)(Toolbar);

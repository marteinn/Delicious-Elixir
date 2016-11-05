import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';


class Toolbar extends React.Component {
    render() {
        const { currentUser, modifiers } = this.props;

        return (
            <nav className={classNames('Toolbar', modifiers)}>
                <ul className="Toolbar__List">
                    <li className="Toolbar__Item">
                        <Link to={'/'} className="Toolbar__Link">Elixir+Delicious</Link>
                    </li>

                    <li className="Toolbar__Item">
                        <input type="" className="Toolbar__Search" placeholder="Search" />
                    </li>

                    {currentUser ?
                        <li className="Toolbar__Item">
                            <Link to={'users/'+currentUser.username} activeClassName="Toolbar__Link--Active" className="Toolbar__Link">My links</Link>
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
                        <a href="#" className="Toolbar__Link">Add link</a>
                    </li>

                    {currentUser ?
                        <li className="Toolbar__Item">
                            <a href="#" className="Toolbar__Link">Settings</a>
                        </li>
                        :
                        null
                    }

                    {currentUser ?
                        <li className="Toolbar__Item">
                            <Link to={'/sign-out'} className="Toolbar__Link">Sign Out</Link>
                        </li>
                        :
                        null
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

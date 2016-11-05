import React from 'react';
import { connect } from 'react-redux';
import { fetchLinks } from '../actions/link';
import UserHeader from '../components/UserHeader/UserHeader';


class UserDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchLinks());
    }

    render() {
        const { currentUser, links } = this.props;

        return (
            <div>
                <UserHeader user={currentUser} />
                <h1>1 Hello</h1>
                {links.map((link, index) => {
                    return (<li key={index}><a href={ link.url}>{ link.title }</a></li>)
                })}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.session.currentUser,
        links: state.link.links,
    };
};

export default connect(mapStateToProps)(UserDetail);

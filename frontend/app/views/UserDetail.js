import React from 'react';
import { connect } from 'react-redux';
import { fetchLinks } from '../actions/link';
import UserHeader from '../components/UserHeader/UserHeader';
import LinkList from '../components/LinkList/LinkList';


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
                <LinkList links={links} />
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

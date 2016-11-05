import React from 'react';
import { connect } from 'react-redux';
import { fetchLinks } from '../actions/link';
import UserHeader from '../components/UserHeader/UserHeader';
import LinkList from '../components/LinkList/LinkList';


class UserDetail extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchLinks());
    }

    render() {
        const { user, links } = this.props;

        return (
            <div>
                <UserHeader user={user} />
                <LinkList links={links} />
            </div>

        );
    }
}

UserDetail.propTypes = {
    links: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func,
};

const mapStateToProps = state => {
    return {
        user: state.session.currentUser,
        links: state.link.links,
    };
};

export default connect(mapStateToProps)(UserDetail);

import React from 'react';
import { connect } from 'react-redux';
import { fetchUserLinks } from '../actions/links';
import { followList } from '../actions/currentList';
import UserHeader from '../components/UserHeader/UserHeader';
import LinkList from '../components/LinkList/LinkList';


class UserDetail extends React.Component {
    componentDidMount() {
        const { dispatch, socket } = this.props;
        const { username } = this.props.params;
        const category = `links:${username}`;

        dispatch(fetchUserLinks(username));
        dispatch(followList(socket, category));
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

/*UserDetail.defaultProps = {*/
    //isFetching: false,
    //items: {},
    //visited: [],
    //lastUpdated: -1,
/*};*/

const mapStateToProps = state => {
    const currentList = Object.assign({
        category: undefined,
    }, state.currentList);

    const categoryState = Object.assign({
        isFetching: false,
        ids: [],
    }, state.linksByCategory[currentList.category]);

    const links = categoryState.ids.map((id) => state.links[id]);

    return {
        user: state.session.currentUser,
        socket: state.session.socket,
        links,
    };
};

export default connect(mapStateToProps)(UserDetail);

import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import {
    fetchUserLinks,
    fetchMoreUserLinks,
    deleteLink,
} from '../../actions/links';
import { fetchUser } from '../../actions/users';
import { deleteLinkData } from '../../actions/linkData';
import { followList, unFollowList } from '../../actions/currentList';
import { showModal, hideModal, modalNames } from '../../actions/modals';
import UserHeader from '../../components/UserHeader';
import LinkList from '../../components/LinkList';


class UserDetail extends React.Component {
    static propTypes = {
        links: React.PropTypes.array.isRequired,
        editableIds: React.PropTypes.array,
        user: React.PropTypes.object,
        username: React.PropTypes.string,
        isFetching: React.PropTypes.bool,
        isComplete: React.PropTypes.bool,
        socket: React.PropTypes.object,
        dispatch: React.PropTypes.func,
    };

    static defaultProps = {
        editableIds: [],
    }

    componentDidMount() {
        const { dispatch, socket, username } = this.props;
        const category = `links:${username}`;

        dispatch(fetchUser(username));
        dispatch(fetchUserLinks(username));
        dispatch(followList(socket, category));
    }

    componentDidUpdate(prevProps) {
        const { username: prevUsername } = prevProps;
        const { username } = this.props;
        const { dispatch, socket } = this.props;
        const prevCategory = `links:${prevUsername}`;
        const category = `links:${username}`;

        if (prevUsername === username) {
            return;
        }

        dispatch(unFollowList(socket, prevCategory));

        dispatch(fetchUser(username));
        dispatch(fetchUserLinks(username));
        dispatch(followList(socket, category));
    }

    componentWillUnmount() {
        const { dispatch, socket, username } = this.props;
        const category = `links:${username}`;

        dispatch(unFollowList(socket, category));
    }

    handleRequestEdit = link => {
        const { dispatch } = this.props;

        dispatch(showModal(modalNames.EDIT_LINK, link));
    }

    handleRequestDelete = link => {
        const { dispatch } = this.props;

        dispatch(deleteLink(link));

        // Run optimistic update
        //dispatch(deleteLinkData(link));
    }

    handleWaypointEnter = ({ previousPosition, currentPosition, event }) => {
        const { isFetching, dispatch, isComplete } = this.props;
        const { username } = this.props;

        if (isFetching || isComplete) {
            return;
        }

        dispatch(fetchMoreUserLinks(username));
    }

    render() {
        const { username, user, links, editableIds } = this.props;

        return (
            <div>
                {user !== undefined && <UserHeader user={user} />}
                <LinkList
                    links={links}
                    editableIds={editableIds}
                    onRequestEdit={this.handleRequestEdit}
                    onRequestDelete={this.handleRequestDelete}
                />
                {Boolean(links.length > 0) &&
                    <Waypoint onEnter={this.handleWaypointEnter} />
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const currentList = Object.assign({
        category: undefined,
    }, state.currentList);

    const { username } = ownProps.params;
    const user = state.users[username];
    const sessionUser = state.session.currentUser;

    const categoryState = Object.assign({
        isFetching: false,
        isComplete: false,
        ids: [],
    }, state.linksByCategory[currentList.category]);

    let links = categoryState.ids.map((id) => state.links[id]);
    links = links.filter((item) => item);

    let editableIds = links.map((item) => {
        return sessionUser.id === item.user.id ? item.id : 0;
    });
    editableIds = editableIds.filter((id) => id);

    return {
        isFetching: categoryState.isFetching,
        isComplete: categoryState.isComplete,
        socket: state.session.socket,
        links,
        editableIds,
        username,
        user,
    };
};

export default connect(mapStateToProps)(UserDetail);

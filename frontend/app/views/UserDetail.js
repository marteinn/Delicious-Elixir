import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import {
    fetchUserLinks,
    fetchMoreUserLinks,
    deleteLink,
} from '../actions/links';
import { deleteLinkData } from '../actions/linkData';
import { followList, unFollowList } from '../actions/currentList';
import { showModal, hideModal, modalNames } from '../actions/modals';
import UserHeader from '../components/UserHeader';
import LinkList from '../components/LinkList';


class UserDetail extends React.Component {
    static propTypes = {
        links: React.PropTypes.array.isRequired,
        user: React.PropTypes.object.isRequired,
        isFetching: React.PropTypes.bool,
        isComplete: React.PropTypes.bool,
        socket: React.PropTypes.object,
        params: React.PropTypes.object,
        dispatch: React.PropTypes.func,
    };

    componentDidMount() {
        const { dispatch, socket } = this.props;
        const { username } = this.props.params;
        const category = `links:${username}`;

        dispatch(fetchUserLinks(username));
        dispatch(followList(socket, category));
    }

    componentDidUpdate(prevProps) {
        const { username: prevUsername } = prevProps.params;
        const { username } = this.props.params;

        if (prevUsername !== username) {
            const { dispatch, socket } = this.props;
            const prevCategory = `links:${prevUsername}`;
            const category = `links:${username}`;

            dispatch(unFollowList(socket, prevCategory));

            dispatch(fetchUserLinks(username));
            dispatch(followList(socket, category));
        }
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
        const { username } = this.props.params;

        if (isFetching || isComplete) {
            return;
        }

        dispatch(fetchMoreUserLinks(username));
    }

    render() {
        const { user, links } = this.props;

        return (
            <div>
                <UserHeader user={user} />
                <LinkList
                    links={links}
                    onRequestEdit={this.handleRequestEdit}
                    onRequestDelete={this.handleRequestDelete}
                />
                {links.length &&
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

    const categoryState = Object.assign({
        isFetching: false,
        isComplete: false,
        ids: [],
    }, state.linksByCategory[currentList.category]);

    let links = categoryState.ids.map((id) => state.links[id]);
    links = links.filter((item) => item);

    return {
        isFetching: categoryState.isFetching,
        isComplete: categoryState.isComplete,
        user: state.session.currentUser,
        socket: state.session.socket,
        links,
    };
};

export default connect(mapStateToProps)(UserDetail);

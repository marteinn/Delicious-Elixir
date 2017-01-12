import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import {
    fetchLatestLinks,
    fetchMoreLatestLinks,
    deleteLink,
} from '../../actions/links';
import { followList, unFollowList } from '../../actions/currentList';
import LinkList from '../../components/LinkList';


class Home extends React.Component {
    static propTypes = {
        links: React.PropTypes.array.isRequired,
        editableIds: React.PropTypes.array,
        isFetching: React.PropTypes.bool,
        isComplete: React.PropTypes.bool,
        socket: React.PropTypes.object,
        dispatch: React.PropTypes.func,
    };

    static defaultProps = {
        editableIds: [],
    }

    componentDidMount() {
        const { dispatch, socket } = this.props;
        const category = 'links:latest';

        dispatch(fetchLatestLinks());
        dispatch(followList(socket, category));
    }

    componentWillUnmount() {
        const { dispatch, socket } = this.props;

        dispatch(unFollowList(socket, 'links:latest'));
    }

    componentDidUpdate(prevProps) {
    }

    handleRequestEdit = link => {
    }

    handleRequestDelete = link => {
    }

    handleWaypointEnter = ({ previousPosition, currentPosition, event }) => {
        const { isFetching, dispatch, isComplete } = this.props;

        if (isFetching || isComplete) {
            return;
        }

        dispatch(fetchMoreLatestLinks());
    }

    render() {
        const { links, editableIds } = this.props;

        return (
            <div>
                <h2>Latest links</h2>
                <LinkList
                    links={links}
                    editableIds={editableIds}
                    avatar={true}
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
    };
};

export default connect(mapStateToProps)(Home);

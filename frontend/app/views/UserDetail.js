import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { fetchUserLinks, fetchMoreUserLinks } from '../actions/links';
import { followList } from '../actions/currentList';
import UserHeader from '../components/UserHeader/UserHeader';
import LinkList from '../components/LinkList/LinkList';


class UserDetail extends React.Component {
    state = {
    };

    componentDidMount() {
        const { dispatch, socket } = this.props;
        const { username } = this.props.params;
        const category = `links:${username}`;

        dispatch(fetchUserLinks(username));
        dispatch(followList(socket, category));
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
                <LinkList links={links} />
                {links.length &&
                    <Waypoint
                        onEnter={this.handleWaypointEnter}
                    />
                }
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
        isComplete: false,
        ids: [],
    }, state.linksByCategory[currentList.category]);

    const links = categoryState.ids.map((id) => state.links[id]);

    return {
        isFetching: categoryState.isFetching,
        isComplete: categoryState.isComplete,
        user: state.session.currentUser,
        socket: state.session.socket,
        links,
    };
};

export default connect(mapStateToProps)(UserDetail);

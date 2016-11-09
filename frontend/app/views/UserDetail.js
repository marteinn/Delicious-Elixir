import React from 'react';
import { connect } from 'react-redux';
import { fetchLinks } from '../actions/links';
import { followList } from '../actions/currentList';
import UserHeader from '../components/UserHeader/UserHeader';
import LinkList from '../components/LinkList/LinkList';


class UserDetail extends React.Component {
    componentDidMount() {
        const { dispatch, user, socket } = this.props;
        const category = `links:${user.id}`;

        dispatch(fetchLinks(category));
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
    let currentList = Object.assign({
        category: undefined,
    }, state.currentList);

    let categoryState = Object.assign({
        isFetching: false,
        ids: []
    }, state.linksByCategory[currentList.category]);

    let links = categoryState.ids.map((id) => state.links[id]);

    return {
        user: state.session.currentUser,
        socket: state.session.socket,
        links: links,
    };
};

export default connect(mapStateToProps)(UserDetail);

import { updateLinkData, deleteLinkData, createLinkData } from './linkData';

const CURRENT_LIST_FOLLOWED_LIST = 'CURRENT_LIST_FOLLOWED_LIST';
const CURRENT_LIST_UNFOLLOWED_LIST = 'CURRENT_LIST_UNFOLLOWED_LIST';


const toggleList = (socket, category) => {
    return (dispatch, getState) => {
        const currentCategory = getState().currentList.category;

        if (currentCategory === category) {
            return;
        }

        if (currentCategory) {
            dispatch(unFollowList(socket, currentCategory));
        }

        dispatch(followList(socket, category));
    };
}

const followList = (socket, category) => {
    return dispatch => {
        const channel = socket.channel(category);

        channel.join().receive('ok', (response) => {
            console.log(`joined ${category}`);
        });

        channel.on('item:created', (msg) => {
            dispatch(createLinkData(msg.data, category));
        });

        channel.on('item:updated', (msg) => {
            dispatch(updateLinkData(msg.data, category));
        });

        channel.on('item:deleted', (msg) => {
            dispatch(deleteLinkData(msg.data, category));
        });

        dispatch({
            type: CURRENT_LIST_FOLLOWED_LIST,
            category,
            channel,
        });
    };
};

const unFollowCurrentList = (socket, category) => {
    return (dispatch, getState) => {
        const currentCategory = getState().currentList.category;
        dispatch(unFollowList(socket, currentCategory));
    }
}

const unFollowList = (socket, category) => {
    return dispatch => {
        const channel = socket.channel(category);

        channel.leave().receive('ok', (response) => {
            console.log('left channel');
        });

        dispatch({
            type: CURRENT_LIST_UNFOLLOWED_LIST,
            category,
            channel,
        });
    };
};

export {
    CURRENT_LIST_FOLLOWED_LIST,
    CURRENT_LIST_UNFOLLOWED_LIST,
    toggleList,
    followList,
    unFollowList,
    unFollowCurrentList,
};

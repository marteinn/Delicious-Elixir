import { updateLinkData, deleteLinkData, createLinkData } from './linkData';

const CURRENT_LIST_FOLLOWED_LIST = 'CURRENT_LIST_FOLLOWED_LIST';
const CURRENT_LIST_UNFOLLOWED_LIST = 'CURRENT_LIST_UNFOLLOWED_LIST';

const followList = (socket, category) => {
    return dispatch => {
        const channel = socket.channel(category);

        //unFollowList();

        channel.join().receive('ok', (response) => {
            //console.log('joined!');
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
    followList,
    unFollowList,
};

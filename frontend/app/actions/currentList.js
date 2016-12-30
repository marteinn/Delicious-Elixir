const CURRENT_LIST_FOLLOWED_LIST = 'CURRENT_LIST_FOLLOWED_LIST';

import { updateLinkData } from './links';


const followList = (socket, category) => {
    return dispatch => {
        const channel = socket.channel(category);

        channel.join().receive('ok', (response) => {
            console.log('joined!');
        });

        channel.on('list:updated', (msg) => {
            dispatch(updateLinkData(msg.data));
        });

        dispatch({
            type: CURRENT_LIST_FOLLOWED_LIST,
            category,
            channel,
        });
    };
};

const unfollowList = () => {
};

export {
    CURRENT_LIST_FOLLOWED_LIST,
    followList,
    unfollowList,
};

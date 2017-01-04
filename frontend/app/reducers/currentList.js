import {
    CURRENT_LIST_FOLLOWED_LIST,
    CURRENT_LIST_UNFOLLOWED_LIST,
} from '../actions/currentList';

const initialState = {
    category: null,
    channel: null,
};

const currentList = (state = initialState, action = { }) => {
    switch (action.type) {
        case CURRENT_LIST_UNFOLLOWED_LIST: {
            return initialState;
        }

        case CURRENT_LIST_FOLLOWED_LIST: {
            return { ...state, category: action.category, channel: action.channel };
        }
        default: {
            return state;
        }
    }
};


export default currentList;

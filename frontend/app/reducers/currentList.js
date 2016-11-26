import { CURRENT_LIST_FOLLOWED_LIST } from '../actions/currentList';

const initialState = {
    category: null,
    channel: null,
};

const currentList = (state = initialState, action = { }) => {
    switch (action.type) {
        case CURRENT_LIST_FOLLOWED_LIST:
            return { ...state, category: action.category, channel: action.channel };
        default:
            return state;
    }
};


export default currentList;

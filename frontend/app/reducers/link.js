import { LINKS_RECEIVED } from '../actions/link';

const initialState = {
    links: [],
};

const link = (state = initialState, action = { }) => {
    switch (action.type) {
        case LINKS_RECEIVED:
            return { ...state, links: action.links };
        default:
            return state;
    }
};

export default link;

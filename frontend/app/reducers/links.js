import {
    LINKS_RECEIVED,
    CREATE_LINK_DATA,
    UPDATE_LINK_DATA,
    DELETE_LINK_DATA,
} from '../actions/links';

const initialState = {};

const links = (state = initialState, action = { }) => {
    switch (action.type) {
        case CREATE_LINK_DATA: {
            return Object.assign([], state, {
                [action.link.id]: action.link,
            });
        }
        case UPDATE_LINK_DATA: {
            return Object.assign([], state, {
                [action.link.id]: action.link,
            });
        }
        case DELETE_LINK_DATA: {
            let newState = Object.assign({}, state);
            delete newState[action.link.id];
            return newState;
        }
        case LINKS_RECEIVED: {
            const formattedLinks = {};
            action.links.forEach((item) => {
                formattedLinks[item.id] = item;
            });
            return Object.assign({}, state, formattedLinks);
        }
        default: {
            return state;
        }
    }
};

export default links;

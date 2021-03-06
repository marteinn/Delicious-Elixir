import { LINKS_RECEIVED } from '../actions/links';
import {
    CREATE_LINK_DATA,
    UPDATE_LINK_DATA,
    DELETE_LINK_DATA,
} from '../actions/linkData';

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
            const newState = Object.assign({}, state);
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

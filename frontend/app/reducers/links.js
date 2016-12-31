import { LINKS_RECEIVED, UPDATE_LINK_DATA } from '../actions/links';

const initialState = {};

const links = (state = initialState, action = { }) => {
    switch (action.type) {
        case UPDATE_LINK_DATA: {
            return Object.assign([], state, {
                [action.link.id]: action.link,
            });
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

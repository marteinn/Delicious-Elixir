import { LINKS_RECEIVED } from '../actions/links';

const initialState = {};

const links = (state = initialState, action = { }) => {
    switch (action.type) {
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

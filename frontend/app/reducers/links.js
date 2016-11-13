import { LINKS_RECEIVED } from '../actions/links';

const initialState = {};

const links = (state = initialState, action = { }) => {
    switch (action.type) {
        case LINKS_RECEIVED:
            let formattedLinks = {};
            console.log(action);
            action.links.map((item) => {
                formattedLinks[item.id] = item;
            });
            return Object.assign({}, state, formattedLinks);
        default:
            return state;
    }
};

export default links;

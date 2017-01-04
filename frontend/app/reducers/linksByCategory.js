import {
    LINKS_REQUEST,
    LINKS_RECEIVED,
    CREATE_LINK_DATA,
    DELETE_LINK_DATA,
} from '../actions/links';


function category(state = {
    isFetching: false,
    isComplete: false,
    lastUpdated: -1,
    next: null,
    ids: [],
}, action) {
    switch (action.type) {
        case CREATE_LINK_DATA: {
            const ids = [action.link.id, ...state.ids];
            return Object.assign({}, state, {
                ids,
            });
        }

        case DELETE_LINK_DATA: {
            const ids = state.ids.filter(id => id !== action.link.id);
            return Object.assign({}, state, {
                ids,
            });
        }

        case LINKS_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
            });
        }

        case LINKS_RECEIVED: {
            const ids = !action.invalidate ? state.ids : [];
            const newIds = action.links.map((item) => item.id);

            return Object.assign({}, state, {
                isFetching: false,
                lastUpdated: action.receivedAt,
                isComplete: !action.meta.next,
                next: action.meta.next,
                ids: ids.concat(newIds),
            });
        }
        default: {
            return state;
        }
    }
}

function linksByCategory(state = {
    /*user: {*/
        //isFetching: false,
        //lastUpdated: -1,
        //ids: [],
        //next: null,
    /*},*/
    /*popular: {*/
        //isFetching: false,
        //lastUpdated: -1,
        //ids: [],
        //next: null,
    //},
    //editorial: {
        //isFetching: false,
        //lastUpdated: -1,
        //ids: [],
        //next: null,
    /*},*/
}, action) {
    switch (action.type) {
        case CREATE_LINK_DATA:
        case DELETE_LINK_DATA:
        case LINKS_REQUEST:
        case LINKS_RECEIVED:
            return Object.assign({}, state, {
                [action.category]: category(state[action.category], action),
            });

        default:
            return state;
    }
}

export default linksByCategory;

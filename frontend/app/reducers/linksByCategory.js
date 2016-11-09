import {
    LINKS_REQUEST,
    LINKS_RECEIVED,
    LINKS_INVALIDATE,
} from '../actions/links';


function category(state={
    isFetching: false,
    lastUpdated: -1,
    next: null,
    ids: []
}, action) {
    switch(action.type) {
        case LINKS_INVALIDATE:
            return Object.assign({}, state, {
                lastUpdated: -1,
                next: null,
                ids: [],
            })

        case LINKS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })

        case LINKS_RECEIVED:
            let ids = action.links.map((item) => item.id);

            return Object.assign({}, state, {
                isFetching: false,
                lastUpdated: action.receivedAt,
                //next: action.meta.next,
                ids: state.ids.concat(ids)
            })

        default:
            return state;
    }
}

function linksByCategory(state={
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
    switch(action.type) {
        case LINKS_INVALIDATE:
        case LINKS_REQUEST:
        case LINKS_RECEIVED:
            return Object.assign({}, state, {
                [action.category]: category(state[action.category], action)
            });

        default:
            return state;
    }
}

export default linksByCategory;

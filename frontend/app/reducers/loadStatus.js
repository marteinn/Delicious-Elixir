import {
    LOAD_STATUS_LOADING,
    LOAD_STATUS_DONE,
    CATEGORY_PROFILE,
} from '../actions/loadStatus';

const defaultStatusState = {
    loading: false,
}

function status(state = {
    loading: false,
}, action) {
    switch(action.type) {
        case LOAD_STATUS_LOADING: {
            return {...state, loading: true};
        }
        case LOAD_STATUS_DONE: {
            return {...state, loading: false};
        }
        default: {
            return state;
        }
    }
}

function loadStatus(state = {
    [CATEGORY_PROFILE]: defaultStatusState,
}, action) {
    switch(action.type) {
        case LOAD_STATUS_LOADING:
        case LOAD_STATUS_DONE:
            return Object.assign({}, state, {
                [action.category]: status(state[action.category], action),
            });
        default: {
            return state;
        }
    }
}

export default loadStatus;

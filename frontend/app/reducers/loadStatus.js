import {
    LOAD_STATUS_RESET,
    LOAD_STATUS_LOADING,
    LOAD_STATUS_DONE,
    CATEGORY_PROFILE,
    CATEGORY_PASSWORD,
} from '../actions/loadStatus';

const defaultStatusState = {
    loading: false,
    errors: [],
    success: false,
};

function status(state = {
    loading: false,
}, action) {
    switch (action.type) {
        case LOAD_STATUS_RESET: {
            return { ...defaultStatusState };
        }
        case LOAD_STATUS_LOADING: {
            return { ...state, loading: true };
        }
        case LOAD_STATUS_DONE: {
            const { errors, success } = action;
            return { ...state, loading: false, errors, success };
        }
        default: {
            return { ...defaultStatusState };
        }
    }
}

function loadStatus(state = {
    [CATEGORY_PROFILE]: { ...defaultStatusState },
    [CATEGORY_PASSWORD]: { ...defaultStatusState },
}, action) {
    switch (action.type) {
        case LOAD_STATUS_RESET:
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

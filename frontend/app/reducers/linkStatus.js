import {
    CREATE_LINK_SUCCESS,
    CREATE_LINK_RESET,
    CREATE_LINK_ERROR,
    EDIT_LINK_SUCCESS,
    EDIT_LINK_RESET,
    EDIT_LINK_ERROR,
} from '../actions/links';

const initialState = {
    errors: [],
    success: false,
    isFetching: false,
};

const linkStatus = (state = initialState, action = { }) => {
    switch (action.type) {
        case EDIT_LINK_RESET:
        case CREATE_LINK_RESET: {
            return initialState;
        }

        case EDIT_LINK_SUCCESS:
        case CREATE_LINK_SUCCESS: {
            return Object.assign({}, state, {
                errors: {},
                success: true,
                isFetching: false,
            });
        }
        case EDIT_LINK_ERROR:
        case CREATE_LINK_ERROR: {
            return Object.assign({}, state, {
                errors: action.errors,
                success: false,
                isFetching: false,
            });
        }
        default: {
            return state;
        }
    }
};

export default linkStatus;

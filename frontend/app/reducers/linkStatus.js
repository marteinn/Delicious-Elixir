import {
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR,
    CREATE_LINK_RESET
} from '../actions/links';

const initialState = {
    errors: {},
    success: false,
    isFetching: false,
};

const linkStatus = (state = initialState, action = { }) => {
    switch (action.type) {
        case CREATE_LINK_RESET: {
            return initialState;
        }

        case CREATE_LINK_SUCCESS: {
            return Object.assign({}, state, {
                errors: {},
                success: true,
                isFetching: false,
            });
        }
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

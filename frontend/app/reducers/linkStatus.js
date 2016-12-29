import { CREATE_LINK_ERROR } from '../actions/links';

const initialState = {
    errors: {},
    success: false,
    isFetching: false,
};

const linkStatus = (state = initialState, action = { }) => {
    switch (action.type) {
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

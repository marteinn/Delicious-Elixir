import { CURRENT_USER, SESSION_ERROR } from '../actions/session';

const initialState = {
    currentUser: null,
    //socket: null,
    errors: [],
};


const session = (state = initialState, action = { }) => {
    switch (action.type) {
        case CURRENT_USER:
            return { ...state, currentUser: action.user };
        case SESSION_ERROR:
            return { ...state, errors: [action.error.error] };
        default:
            return state;
    }
};

export default session;

import { CURRENT_USER } from '../actions/session';

const initialState = {
    currentUser: null,
    //socket: null,
    //error: null,
};


const session = (state = initialState, action = { }) => {
    switch (action.type) {
        case CURRENT_USER:
            return { ...state, currentUser: action.user };
        default:
            return state;
    }
};

export default session;

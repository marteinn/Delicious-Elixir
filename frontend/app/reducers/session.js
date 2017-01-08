import { CURRENT_USER, SESSION_ERROR, CLEAR_SESSION } from '../actions/session';
import { UPDATE_PROFILE_SUCCESS} from '../actions/settings';

const initialState = {
    currentUser: null,
    socket: null,
    errors: [],
};


const session = (state = initialState, action = { }) => {
    switch (action.type) {
        case CURRENT_USER: {
            return { ...state, currentUser: action.user, socket: action.socket };
        }
        case SESSION_ERROR: {
            return { ...state, errors: [action.error.error] };
        }
        case CLEAR_SESSION: {
            return { ...state, currentUser: null, errors: [] };
        }
        case UPDATE_PROFILE_SUCCESS: {
            let { currentUser } = state;
            currentUser = {...currentUser, ...action.user};
            return { ...state, currentUser };
        }
        default: {
            return state;
        }
    }
};

export default session;

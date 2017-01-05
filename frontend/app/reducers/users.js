import { USER_RECEIVED } from '../actions/users';

const initialState = { };

const users = (state = initialState, action = { }) => {
    switch (action.type) {
        case USER_RECEIVED: {
            return Object.assign([], state, {
                [action.user.username]: action.user,
            });
        }
        default: {
            return state;
        }
    }
};

export default users;

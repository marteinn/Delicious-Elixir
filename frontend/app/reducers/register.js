import { REGISTER_USER, REGISTER_ERROR } from '../actions/register';

const initialState = {
    errors: [],
};

const register = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return state;
        case REGISTER_ERROR:
            return { ...state, errors: action.error.errors };
        default:
            return state;
    }
};

export default register;

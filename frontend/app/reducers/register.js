import { REGISTER_USER } from '../actions/register';

const register = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return state;
        default:
            return state;
    }
}

export default register;

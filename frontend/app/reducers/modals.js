import { MODAL_SHOW, MODAL_HIDE } from '../actions/modals';

const initialState = {
    createLink: { isOpen: false, data: null },
};

const modals = (state = initialState, action = { }) => {
    switch (action.type) {
        case MODAL_SHOW:
            return Object.assign({}, state, {
                [action.name]: { isOpen: true, data: action.data },
            });
        case MODAL_HIDE:
            return Object.assign({}, state, {
                [action.name]: { isOpen: false, data: null },
            });
        default:
            return state;
    }
};

export default modals;

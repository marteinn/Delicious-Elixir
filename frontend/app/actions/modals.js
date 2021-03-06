import { CREATE_LINK_RESET, EDIT_LINK_RESET } from './links';

const MODAL_SHOW = 'MODAL_SHOW';
const MODAL_HIDE = 'MODAL_HIDE';

const modalNames = {
    CREATE_LINK: 'createLink',
    EDIT_LINK: 'editLink',
};

const showModal = (name, data = null) => {
    return dispatch => {
        if (name === modalNames.CREATE_LINK) {
            dispatch({ type: CREATE_LINK_RESET });
        }

        if (name === modalNames.EDIT_LINK) {
            dispatch({ type: EDIT_LINK_RESET });
        }

        dispatch({
            type: MODAL_SHOW,
            name,
            data,
        });
    };
};

const hideModal = (name) => {
    return {
        type: MODAL_HIDE,
        name,
    };
};

export {
    MODAL_SHOW,
    MODAL_HIDE,
    modalNames,
    showModal,
    hideModal,
};

const MODAL_SHOW = 'MODAL_SHOW';
const MODAL_HIDE = 'MODAL_HIDE';

const modalNames = {
    CREATE_LINK: 'createLink',
}

const showModal = (name, data=null) => {
    return {
        type: MODAL_SHOW,
        name,
        data,
    };
}

const hideModal = (name) => {
    return {
        type: MODAL_HIDE,
        name,
    };
}

export {
    MODAL_SHOW,
    MODAL_HIDE,
    modalNames,
    showModal,
    hideModal,
};

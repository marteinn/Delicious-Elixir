const LOAD_STATUS_RESET = 'LOAD_STATUS_RESET';
const LOAD_STATUS_LOADING = 'LOAD_STATUS_LOADING';
const LOAD_STATUS_DONE = 'LOAD_STATUS_DONE';

const CATEGORY_PROFILE = 'profile';
const CATEGORY_PASSWORD = 'password';

const loadStatusReset = (category) => {
    return {
        type: LOAD_STATUS_RESET,
        category,
    };
};

const loadStatusLoading = (category) => {
    return {
        type: LOAD_STATUS_LOADING,
        category,
    };
};

const loadStatusDone = (category, success = true, errors = []) => {
    return {
        type: LOAD_STATUS_DONE,
        category,
        errors,
        success,
    };
};

export {
    LOAD_STATUS_LOADING,
    LOAD_STATUS_DONE,

    CATEGORY_PROFILE,
    CATEGORY_PASSWORD,

    loadStatusLoading,
    loadStatusDone,
};

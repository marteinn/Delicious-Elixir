const LOAD_STATUS_LOADING = 'LOAD_STATUS_LOADING';
const LOAD_STATUS_DONE = 'LOAD_STATUS_DONE';

const CATEGORY_PROFILE = 'profile';

const loadStatusLoading = (category) => {
    return {
        type: LOAD_STATUS_LOADING,
        category: category,
    }
}

const loadStatusDone = (category) => {
    return {
        type: LOAD_STATUS_DONE,
        category: category,
    }
}

export {
    LOAD_STATUS_LOADING,
    LOAD_STATUS_DONE,

    CATEGORY_PROFILE,

    loadStatusLoading,
    loadStatusDone,
}

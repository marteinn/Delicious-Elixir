const CREATE_LINK_DATA = 'CREATE_LINK_DATA';
const UPDATE_LINK_DATA = 'UPDATE_LINK_DATA';
const DELETE_LINK_DATA = 'DELETE_LINK_DATA';


const createLinkData = (link, category) => {
    return {
        type: CREATE_LINK_DATA,
        link,
        category,
    };
};

const updateLinkData = (link, category) => {
    return {
        type: UPDATE_LINK_DATA,
        link,
        category,
    };
};

const deleteLinkData = (link, category) => {
    return {
        type: DELETE_LINK_DATA,
        link,
        category,
    };
};

export {
    UPDATE_LINK_DATA,
    DELETE_LINK_DATA,
    CREATE_LINK_DATA,

    updateLinkData,
    deleteLinkData,
    createLinkData,
};

const initialState = {
    currentUser: null,
    socket: null,
    error: null,
};


const session = (state = initialState, action = { }) => {
    switch (action.type) {
    case 'RANDOM':
        return state;
    default:
        return state;
    }
};

export default session;

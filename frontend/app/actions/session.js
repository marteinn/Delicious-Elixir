import { httpGet } from '../utils/http';

const CURRENT_USER = 'CURRENT_USER';

const setCurrentUser = (dispatch, user) => {
    dispatch({
        type: CURRENT_USER,
        user,
    });
};

const currentUser = () => {
    // const token = localStorage.getItem('token');

    return dispatch => {
        httpGet('/api/v1/current-user')
        .then((data) => {
            setCurrentUser(dispatch, data);
        }).catch((error) => {
            console.log(error);
        });
    };
};

export {
    CURRENT_USER,
    setCurrentUser,
    currentUser,
};

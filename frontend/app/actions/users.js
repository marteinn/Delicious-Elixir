import { httpGet } from '../utils/http';

const USER_RECEIVED = 'USER_RECEIVED';

const fetchUser = username => {
    return dispatch => {
        httpGet(`/api/v1/users/${username}`)
        .then((data) => {
            dispatch({
                type: USER_RECEIVED,
                user: data.body,
            });
        }).catch((error) => {
            console.log(error);
        });
    };
};

export {
    USER_RECEIVED,
    fetchUser,
};

import { httpPut } from '../utils/http';

const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';

const updateProfile = (userData) => {
    return dispatch => {
        httpPut('/api/v1/settings/profile', { user: userData })
        .then((data) => {
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
            });
        }).catch((error) => {
            error.response.json().then((errorJson) => {
                dispatch({
                    type: UPDATE_PROFILE_ERROR,
                    errors: errorJson.errors,
                });
            });
        });
    };
};

const changePassword = (data) => {
    return dispatch => {
    };
};

export {
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,

    updateProfile,
    changePassword,
};

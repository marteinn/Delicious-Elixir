import { httpPut } from '../utils/http';
import { loadStatusLoading, loadStatusDone, CATEGORY_PROFILE } from './loadStatus';

const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';

const updateProfile = (userData) => {
    return dispatch => {
        dispatch(loadStatusLoading(CATEGORY_PROFILE));

        httpPut('/api/v1/settings/profile', { user: userData })
        .then((data) => {
            dispatch(loadStatusDone(CATEGORY_PROFILE));

            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                user: data.body.user,
            });
        }).catch((error) => {
            dispatch(loadStatusDone(CATEGORY_PROFILE));

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

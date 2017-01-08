import { httpPut } from '../utils/http';
import {
    loadStatusLoading,
    loadStatusDone,
    CATEGORY_PROFILE,
    CATEGORY_PASSWORD,
} from './loadStatus';

const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';

const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR';

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

const changePassword = (passwordData) => {
    return dispatch => {
        dispatch(loadStatusLoading(CATEGORY_PASSWORD));

        httpPut('/api/v1/settings/password', passwordData)
        .then((data) => {
            dispatch(loadStatusDone(CATEGORY_PASSWORD, true));

            dispatch({
                type: UPDATE_PASSWORD_SUCCESS,
                user: data.body.user,
            });
        }).catch((error) => {
            error.response.json().then((errorJson) => {
                const errors = errorJson.errors;

                dispatch(loadStatusDone(CATEGORY_PASSWORD, false, errors));

                dispatch({
                    type: UPDATE_PASSWORD_ERROR,
                    errors,
                });
            });
        });
    };
};

export {
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,

    updateProfile,
    changePassword,
};

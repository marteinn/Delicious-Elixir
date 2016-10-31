import { push } from 'react-router-redux';
import { httpGet, httpPost } from '../utils/http';

const CURRENT_USER = 'CURRENT_USER';
const SESSION_ERROR = 'SESSION_ERROR';

const setCurrentUser = (dispatch, user) => {
    dispatch({
        type: CURRENT_USER,
        user,
    });
};

const currentUser = () => {
    return dispatch => {
        httpGet('/api/v1/current-user')
        .then((data) => {
            setCurrentUser(dispatch, data);
        }).catch((error) => {
            console.log(error);
            error.response.json().then((errorJson) => {
                dispatch({
                    type: SESSION_ERROR,
                    error: errorJson,
                });
            });
        });
    };
};

const signIn = (sessionData) => {
    return dispatch => {
        httpPost('/api/v1/sessions', { session: sessionData })
        .then((data) => {
            localStorage.setItem('token', data.jwt);
            setCurrentUser(dispatch, data.user);
            dispatch(push('/'));
        }).catch((error) => {
            error.response.json().then((errorJson) => {
                dispatch({
                    type: SESSION_ERROR,
                    error: errorJson,
                });
            });
        });
    };
};

export {
    CURRENT_USER,
    SESSION_ERROR,
    setCurrentUser,
    currentUser,
    signIn,
};

import { push } from 'react-router-redux';
import { httpGet, httpPost } from '../utils/http';

const CURRENT_USER = 'CURRENT_USER';

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
        });
    }
}

export {
    CURRENT_USER,
    setCurrentUser,
    currentUser,
    signIn,
};

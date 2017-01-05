import { push } from 'react-router-redux';
import { Socket } from 'phoenix';
import { httpGet, httpPost } from '../utils/http';

const CURRENT_USER = 'CURRENT_USER';
const SESSION_ERROR = 'SESSION_ERROR';
const CLEAR_SESSION = 'CLEAR_SESSION';

const setCurrentUser = (dispatch, user) => {
    const token = localStorage.getItem('token');
    const socket = new Socket('/socket', {
        params: {
            token,
        },
        logger: (kind, msg, data) => {
            //console.log(`${kind}: ${msg}`, data);
        },
    });

    socket.connect();

    const channel = socket.channel(`users:${user.username}`);

    if (channel.state !== 'joined') {
        channel.join().receive('ok', resp => {
            dispatch({
                type: CURRENT_USER,
                user,
                socket,
            });
        });
    }
};

const currentUser = () => {
    return dispatch => {
        httpGet('/api/v1/current-user')
        .then((data) => {
            setCurrentUser(dispatch, data.body);
        }).catch((error) => {
            dispatch(push('/sign-in'));
        });
    };
};

const signOut = () => {
    localStorage.removeItem('token');
    return {
        type: CLEAR_SESSION,
    };
};

const signIn = sessionData => {
    return dispatch => {
        httpPost('/api/v1/sessions', { session: sessionData })
        .then((data) => {
            localStorage.setItem('token', data.body.jwt);
            setCurrentUser(dispatch, data.body.user);
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
    signOut,
};

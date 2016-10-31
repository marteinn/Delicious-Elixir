import { push } from 'react-router-redux';
import { httpPost } from '../utils/http';

const REGISTER_USER = 'REGIST_USER';
const REGISTER_ERROR = 'REGISTER_ERROR';

const registerUser = (userData) => {
    return (dispatch) => {
        httpPost('/api/v1/registrations', { user: userData })
        .then((data) => {
            localStorage.setItem('token', data.jwt);

            dispatch(push('/'));
        }).catch((error) => {
            error.response.json().then((errorJson) => {
                dispatch({
                    type: REGISTER_ERROR,
                    error: errorJson,
                });
            });
        });
    };
};

export {
    REGISTER_USER,
    REGISTER_ERROR,
    registerUser,
};

import { push } from 'react-router-redux';
import { httpPost } from '../utils/http';

const REGISTER_USER = 'REGIST_USER';

const registerUser = (userData) => {
    return (dispatch) => {
        httpPost('/api/v1/registrations', { user: userData })
        .then((data) => {
            localStorage.setItem('token', data.jwt);

            dispatch(push('/'));
        }).catch((error) => {
            //console.log(error);
        });
    };
};

export {
    REGISTER_USER,
    registerUser,
};

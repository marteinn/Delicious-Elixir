// signIn
// currentUser
// signOut

import { httpGet } from '../utils/http';

const currentUser = () => {
    const token = localStorage.getItem('token');

    return dispatch => {
        httpGet('/api/v1/current-user')
        .then((data) => {
            console.log('success!');
        }).catch((error) => {
            console.log(error);
        });
    }
}

export {
    currentUser,
}

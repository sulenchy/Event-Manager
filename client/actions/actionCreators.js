import axios from 'axios';

export function signInUser() {
    return (dispatch, getState) => {

        dispatch({
            type: '',
            payload: { id: 1, name: 'sulenchy' }
        });
    }
}

export function signUpUser(useSIGN_IN_USERrData) {
    return (dispatch) => {
        return axios.post('/api/v1/users/signup', userData).then((data) => {
            return Promise.resolve(data);
        }).catch((error) => {
            return Promise.reject(error.response);
        });
    }
}





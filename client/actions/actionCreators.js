import axios from 'axios';

export const signInUser = (userData) => {
    return (dispatch) => {
        return axios.post('/api/v1/users/signin', userData).then(response => {
            let user = response.data.user;
            let token = response.data.data;
            localStorage.setItem('authUser', JSON.stringify({ user, token }));

            dispatch({
                type: 'SIGN_IN_USER',
                payload: { user, token }
            });

            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error.response);
        });
    }
}

export const signOut = () => {
    return (dispatch) => {
        localStorage.removeItem('authUser');
        dispatch({
            type: 'SIGN_OUT_USER'
        });
    }
}

export const signUpUser = (userData) => {
    return (dispatch) => {
        return axios.post('/api/v1/users/signup', userData).then((data) => {
            return Promise.resolve(data);
        }).catch((error) => {
            return Promise.reject(error.response);
        });
    }
}

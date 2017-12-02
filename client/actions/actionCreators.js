import axios from 'axios';

/**
 * Sign in a user
 * @param {*} userData 
 */
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

/**
 * signout a user
 */

export const signOut = () => {
    return (dispatch) => {
        localStorage.removeItem('authUser');
        dispatch({
            type: 'SIGN_OUT_USER'
        });
    }
}


// /**
//  * Signs new user up
//  * @param {*} userData
//  * @returns promise 
//  */
// export const signUpUser = (userData) => {
//     return (dispatch) => {
//         return axios.post('/api/v1/users/signup', userData).then((data) => {
//             signInUser(data);
//             return Promise.resolve(data);
//         }).catch((error) => {
//             return Promise.reject(error.response);
//         });
//     }
// }


/**
 * Sign un a user
 * @param {*} userData 
 */
export const signUpUser = (userData) => {
    return (dispatch) => {
        return axios.post('/api/v1/users/signup', userData).then(response => {
            let user = response.data.user;
            let token = response.data.data;
            localStorage.setItem('authUser', JSON.stringify({ user, token }));
            dispatch({
                type: 'SIGN_UP_USER',
                payload: { user, token }
            });
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error.response);
        });
    }
}


/**
 * Adds new center to the database
 * @param {*} centerData 
 * @returns promise
 */

export const addNewCenter = (centerData) => {
    return (dispatch) => {        
        return axios.post('/api/v1/centers', centerData).then((data) => {
            return Promise.resolve(data);
        }).catch((error) => {
            return Promise.reject(error.response);
        });
    }
}

/**
 * Adds new center to the database
 * @returns promise
 */

export const getAllCenters = () => {
    return (dispatch) => {
        return axios.get('/api/v1/centers').then((data) => {
            return Promise.resolve(data);
        }).catch((error) => {
            return Promise.reject(error.response);
        });
    }
}



/**
 * Adds new event to the database
 * @param {*} eventData 
 * @returns promise
 */

export const addNewEvent = (eventData) => {
    return (dispatch) => {        
        return axios.post('/api/v1/events', eventData).then((data) => {
            return Promise.resolve(data);
        }).catch((error) => {
            return Promise.reject(error.response);
        });
    }
}
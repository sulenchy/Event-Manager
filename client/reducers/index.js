import { combineReducers } from 'redux';
import userReducer from './userReducer';
import centersReducer from './centersReducer';
import authReducer from './authReducer';

export default combineReducers({
    users: userReducer,
    authUser: authReducer,
    centers: centersReducer
});

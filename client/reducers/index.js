import { combineReducers } from 'redux';
import userReducer from './userReducer';
import centersReducer from './centersReducer';

export default combineReducers({
    users: userReducer,
    centers: centersReducer
});

// importing react dependencies
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';

import Main from './Main';
import rootReducer from './reducers';
import Greetings from './components/Greetings';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import AddNewCenter from './components/AddNewCenter';
import AddNewEvent from './components/AddNewEvent';
import Centers from './components/Centers';
// console.log(Routes);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;


/**
 * setting token of an authorised user to axios from the entry point
 */
const setAxios = () => {    
    const userData = localStorage.getItem('authUser');
    if (userData) {
        const token = JSON.parse(userData).token;
        axios.defaults.headers.common['Token'] = token;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    
}

// calling setAxios to set the token
setAxios()



ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Greetings}></IndexRoute>  
                <Route path="/signup" component={SignupPage}></Route>
                <Route path="/signin" component={SigninPage}></Route>
                <Route path="/addnewcenter" component={AddNewCenter}></Route>
                <Route path="/addnewevent" component={AddNewEvent}></Route>
                <Route path="/centers" component={Centers}></Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('app'));

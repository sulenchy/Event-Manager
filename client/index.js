// importing react dependencies
import React from 'react';
import ReactDom from 'react-dom';
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
// console.log(Routes);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;

ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Greetings}></IndexRoute>  
                <Route path="/signup" component={SignupPage}></Route>
                <Route path="/signin" component={SigninPage}></Route>
                <Route path="/addnewcenter" component={AddNewCenter}></Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('app'));

// importing react dependencies
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import App from './app';

// console.log(Routes);

const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
);

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter><App /></BrowserRouter>
    </Provider>, document.getElementById('app'));

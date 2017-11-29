import React from 'react';
// import { Route } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Greetings}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/signin" component={SigninPage}/>
    </Switch>
)

export default Routes;
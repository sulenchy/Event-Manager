import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';

const routerfa = () => (
    <Router>
        <div>
            <Route path="/" component={Greetings}/>
            <Route path="signup" component={SignupPage}/>
        </div>
    </Router>
)

export default routerfa
// importing react dependencies
import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';

import routes from './routes';

ReactDom.render(<Router history={browserHistory} routers={routes} />, document.getElementById('app'));

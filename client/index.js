// importing react dependencies
import React from 'react';
import ReactDom from 'react-dom';

import Routes from './routes';

console.log(Routes);

ReactDom.render(<Routes />, document.getElementById('app'));

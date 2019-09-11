import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import axios from 'axios';

// FIXME - this would be an external API URL
axios.defaults.baseURL = process.env.PUBLIC_URL;

axios.interceptors.request.use(request => {
    // for API debug   console.debug(request);
    return request;
});

ReactDOM.render(<App />, document.getElementById('root'));
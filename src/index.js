import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';

import App from './App';

// FIXME - this would be an external API URL
axios.defaults.baseURL = process.env.PUBLIC_URL;
axios.interceptors.request.use(request => {
    // for API debug   console.debug(request);
    return request;
});

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
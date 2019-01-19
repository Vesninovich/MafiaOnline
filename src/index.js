import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './rootReducer'
import './index.css';
import App from './App';
import setupSocket from './socket';

const name = prompt('Name?');
const address = prompt('Address?');
const port = prompt('Port?');

const store = createStore(reducer);

// const socket = setupSocket(store.dispatch,
//     name || 'Peedor', address || 'localhost', +(port || '4000')
// );
const socket = setupSocket(
    store.dispatch,
    name || 'user-' + Math.floor(10000 + Math.random() * 90000),
    address || 'localhost',
    port || 4000
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
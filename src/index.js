import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './rootReducer'
import './index.css';
import App from './App';
import Socket from './Socket';
// import setupSocket from './socket';

import { setupSocket, createSocketMiddleware } from './socketUtils';

const DIMAS = 'DiMa$';
const ADDRESS = '127.0.0.1';
const PORT = 4000

const name = prompt('Name?', DIMAS) || DIMAS;
const address = prompt('Address?', ADDRESS) || ADDRESS;
const port = +prompt('Port?', PORT) || PORT;

// const socket = setupSocket(store.dispatch,
//     name || 'Peedor', address || 'localhost', +(port || '4000')
// );
// const socket = setupSocket(
//     store.dispatch,
//     name || 'user-' + Math.floor(10000 + Math.random() * 90000),
//     address || 'localhost',
//     port || 4000
// );

const logger = store => next => action => {
    console.log(action);
    next(action);
}

const stripActionType = store => next => action => {
    if (typeof(action.type) === 'object') {
        action.type = action.type.name;
    }
    next(action);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

setupSocket(address, port).then(socket => {
    const store = createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(
                logger,
                createSocketMiddleware(socket),
                stripActionType
            )
        )
    );

    ReactDOM.render(
        <Provider store={store}>
            <App name={name}/>
            <Socket socket={socket} />
        </Provider>,
        document.getElementById('root')
    );
});

// const store = createStore(reducer, applyMiddleware(createSocketMiddleware(socket)));

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root')
// );
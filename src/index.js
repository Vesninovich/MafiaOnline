import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './Redux/rootReducer'
import './index.css';
import App from './App';
// import setupSocket from './socket';

// const store = createStore(reducer);

// const socket = setupSocket(store.dispatch);

ReactDOM.render(
    <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <App />
    </Provider>,
    document.getElementById('root')
);
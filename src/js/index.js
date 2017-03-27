/**
 * Created by Administrator on 2017/3/27.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App.js';
import todoApp from './reducers.js';

let store = createStore(todoApp);
let rootElement = document.getElementById('index');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)

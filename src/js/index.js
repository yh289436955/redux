/**
 * Created by Administrator on 2017/3/27.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import App from './containers/App.js';
// import todoApp from './reducers.js';
//
// let store = createStore(todoApp);
// let rootElement = document.getElementById('index');
//
// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     rootElement
// )


//异步
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { selectSubreddit, fetchPosts } from './actions';
import rootReducer from './reducers';


const loggerMiddleware  = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware (
        thunkMiddleware,        // 允许我们 dispatch() 函数
        loggerMiddleware,       // 一个很便捷的 middleware，用来打印 action 日志
    )
);

let a;
store.dispatch(selectSubreddit('reactjs'));
a = store.dispatch(fetchPosts('reactjs')).then(() =>
    console.log(store.getState())
);
console.log(a);

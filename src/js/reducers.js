// /**
//  * Created by Administrator on 2017/3/27.
//  */
// import {combineReducers } from 'redux';
// import {ADD_TODO,COMPLETE_TODO,SET_VISIBILITY_FILTER,VisibilityFilters} from './actions.js';
// const {SHOW_ALL} = VisibilityFilters;
//
// //最下面的显示当前的的状态
// function visibilityFilter(state = SHOW_ALL,action)
// {
//     switch (action.type)
//     {
//         case SET_VISIBILITY_FILTER :
//             return action.filter;
//         default :
//             return state;
//     }
// }
//
// let a = [
//     {
//         text : "0000",
//         completed : false,
//     },
//     {
//         text : "1111",
//         completed : true,
//     }
// ]
//
// //判断当前是用户是什么操作
// function todos(state = a,action)
// {
//     switch (action.type)
//     {
//         case ADD_TODO :
//             return [
//                 ...state,
//                 {
//                     text : action.text,
//                     completed : false
//                 }
//             ];
//         case COMPLETE_TODO :
//             return [
//                 ...state.slice(0, action.index),
//                 Object.assign({}, state[action.index], {
//                     completed: true
//                 }),
//                 ...state.slice(action.index + 1)
//             ]
//         default :
//             return state;
//     }
// }
//
// const todoApp = combineReducers({
//     visibilityFilter,
//     todos
// })
//
// export default todoApp;



//异步
import {combineReducers } from 'redux';
import {SELECT_SUBREDDIT,INVALIDATE_SUBREDDIT,REQUEST_POSTS,RECEIVE_POSTS} from './actions.js';

function selectedsubreddit (state = 'reactjs',action)
{
    switch (action.type)
    {
        case SELECT_SUBREDDIT :
            return action.subreddit;
        default :
            return state;
    }
}
/*
* isFetching  显示进度条
* didInvalidate 标记数据是否过期
* */


function posts (state = {isFetching : false,didInvalidate : false,items : []},action)
{
    switch (action.type)
    {
        case INVALIDATE_SUBREDDIT :
            return Object.assign({},state,{didInvalidate:true});
        case REQUEST_POSTS :
            return Object.assign({},state,{
                isFetching : true,
                didInvalidate :false
            });
        case RECEIVE_POSTS :
            return Object.assign({}, state, {
                isFetching :false,
                didInvalidate : false,
                items: action.posts,
                lastUpdated : action.receivedAt
            });
        default :
            return state;
    }
}

function postsBySubreddit (state = {}, action)
{
    switch (action.type)
    {
        case INVALIDATE_SUBREDDIT :
        case RECEIVE_POSTS :
        case REQUEST_POSTS :
            return Object.assign({}, state, {
                [action.subreddit] : posts(state[action.subreddit],action)
            })
        default :
            return state;
    }
}

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedsubreddit
});

export  default rootReducer;
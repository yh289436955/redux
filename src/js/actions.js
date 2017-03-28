// /**
//  * Created by Administrator on 2017/3/27.
//  */
// /*
// * action 类型
// */
//
// export const ADD_TODO = 'ADD_TODO';
// export const COMPLETE_TODO  = 'COMPLETE_TODO';
// export const SET_VISIBILITY_FILTER  = 'SET_VISIBILITY_FILTER ';
//
// /*
// *
// * 其他的常量
// * */
// export const VisibilityFilters  = {
//     SHOW_ALL : "SHOW_ALL",
//     SHOW_COMPLETED : "SHOW_COMPLETED",
//     SHOW_ACTIVE : "SHOW_ACTIVE"
// };
//
// /*
// * action 创建函数
// * */
//
// //添加代办事项
// export function addTodo(text) {
//     return {
//         type : ADD_TODO,
//         text
//     }
// };
//
// //完成的代办事项
// export  function completeTodo(index) {
//     return {
//         type : COMPLETE_TODO,
//         index
//     }
// };
//
// //显示完成或者未完成的代办事项
// export function setVisibilityFilter(filter) {
//     return {
//         type : SET_VISIBILITY_FILTER,
//         filter
//     }
// }
//

import fetch from 'isomorphic-fetch';

//异步请求
export const SELECT_SUBREDDIT  = 'SELECT_SUBREDDIT ';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS ';
export const RECEIVE_POSTS = 'RECEIVE_POSTS ';
//选择要显示的
export function selectSubreddit(subreddit)
{
    return {
        type : SELECT_SUBREDDIT,
        subreddit
    }
}

//点击刷新按钮来更新
export function invalidatesubreddit(subreddit)
{
    return {
        type : INVALIDATE_SUBREDDIT,
        subreddit
    }
}
//网络控制刷新请求
function requestPosts(subreddit)
{
    return {
        type : REQUEST_POSTS,
        subreddit,
    }
}

//收到请求响应式
function receivePosts (subreddit,json)
{
    return {
        type : RECEIVE_POSTS,
        subreddit,
        posts : json.data.children.map(child => child.data),
        receivedAt : Date.now()
    }
}

// 来看一下我们写的第一个 thunk action 创建函数！
// 虽然内部操作不同，你可以像其它 action 创建函数 一样使用它：
// store.dispatch(fetchPosts('reactjs'))
export function fetchPosts (subreddit)
{
    // Thunk middleware 知道如何处理函数。
    // 这里把 dispatch 方法通过参数的形式传给函数，
    // 以此来让它自己也能 dispatch action。
    return function (dispatch)
    {
        // 首次 dispatch：更新应用的 state 来通知
        // API 请求发起了。
        dispatch(requestPosts(subreddit));
        // thunk middleware 调用的函数可以有返回值，
        // 它会被当作 dispatch 方法的返回值传递。

        // 这个案例中，我们返回一个等待处理的 promise。
        // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。
        return fetch ('http://www.subreddit.com/r/'+subreddit+'.json').then(response => response.json()).then(json =>
            // 可以多次 dispatch！
            // 这里，使用 API 请求结果来更新应用的 state。
            dispatch(receivePosts(subreddit,json))
        );
        // 在实际应用中，还需要
        // 捕获网络请求的异常。
    }

    // return dispatch => {
    //     dispatch(requestPosts(subreddit))
    //     return fetch('http://www.reddit.com/r/${subreddit}.json')
    //         .then(response => response.json())
    //         .then(json => dispatch(receivePosts(subreddit,json)))
    // }
}


function shouldFetchPosts(state,subreddit)
{
    const posts = state.postsBySubreddit[subreddit];
    if (!posts)
    {
        return true;
    }
    else if (posts.isFetching)
    {
        return false;
    }
    else
    {
        return posts.didInvalidate;
    }
}
export function fetchPostsIfNeeded (subreddit)
{
    // 注意这个函数也接收了 getState() 方法
    // 它让你选择接下来 dispatch 什么。

    // 当缓存的值是可用时，
    // 减少网络请求很有用。
    return (dispatch, getState => {
        if (shouldFetchPosts(getState(),subreddit))
        {
            // 在 thunk 里 dispatch 另一个 thunk！
            return dispatch(fetchPosts(subreddit));
        }
        else
        {
            // 告诉调用代码不需要再等待。
            return Promise.resolve();
        }
    })
}


/**
 * Created by Administrator on 2017/3/27.
 */
/*
* action 类型
*/

export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO  = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER  = 'SET_VISIBILITY_FILTER ';

/*
*
* 其他的常量
* */
export const VisibilityFilters  = {
    SHOW_ALL : "SHOW_ALL",
    SHOW_COMPLETED : "SHOW_COMPLETED",
    SHOW_ACTIVE : "SHOW_ACTIVE"
};

/*
* action 创建函数
* */

//添加代办事项
export function addTodo(text) {
    return {
        type : ADD_TODO,
        text
    }
};

//完成的代办事项
export  function completeTodo(index) {
    return {
        type : COMPLETE_TODO,
        index
    }
};

//显示完成或者未完成的代办事项
export function setVisibilityFilter(filter) {
    return {
        type : SET_VISIBILITY_FILTER,
        filter
    }
}


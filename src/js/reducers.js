/**
 * Created by Administrator on 2017/3/27.
 */
import {combineReducers } from 'redux';
import {ADD_TODO,COMPLETE_TODO,SET_VISIBILITY_FILTER,VisibilityFilters} from './actions.js';
const {SHOW_ALL} = VisibilityFilters;

//最下面的显示当前的的状态
function visibilityFilter(state = SHOW_ALL,action)
{
    switch (action.type)
    {
        case SET_VISIBILITY_FILTER :
            return action.filter;
        default :
            return state;
    }
}

let a = [
    {
        text : "0000",
        completed : false,
    },
    {
        text : "1111",
        completed : true,
    }
]

//判断当前是用户是什么操作
function todos(state = a,action)
{
    switch (action.type)
    {
        case ADD_TODO :
            return [
                ...state,
                {
                    text : action.text,
                    completed : false
                }
            ];
        case COMPLETE_TODO :
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ]
        default :
            return state;
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp;
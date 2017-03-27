/**
 * Created by Administrator on 2017/3/27.
 */
import React from 'react';

//添加待办事项
export default class AddTodo extends React.Component
{
    handleClick (e)
    {
        const node = this.refs.input;
        const text = node.value.trim();
        this.props.onAddClick(text);
        node.value = "";
    };
    render ()
    {
        return (
            <div>
                <input type="text" ref="input"/>
                <button onClick={(e) => this.handleClick(e)}>Add</button>
            </div>
        )
    }
}

AddTodo.propTypes = {
    onAddClick : React.PropTypes.func.isRequired
};
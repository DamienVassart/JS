import React from 'react';

const TodoItem = (props) => {
    return (
        <div className="todo-item">
            <input 
                type="checkbox"
                checked={props.todo.completed}
                onChange={() => props.handleChange(props.todo.id)} 
            />
            <p>{props.todo.text}</p>
        </div>
    )
}

export default TodoItem
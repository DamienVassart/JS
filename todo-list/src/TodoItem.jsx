import React from 'react';

const TodoItem = (props) => {
    const completedStyle = {
        fontStyle: "italic",
        color: "#ccc",
        textDecoration: "line-through"
    }

    return (
        <div className="todo-item" style={{display: "flex"}}>
            <input 
                type="checkbox"
                checked={props.todo.completed}
                onChange={() => props.handleChange(props.todo.id)} 
            />
            <p style={props.todo.completed ? completedStyle : null}>{props.todo.text}</p>
        </div>
    )
}

export default TodoItem
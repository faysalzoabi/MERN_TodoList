import React from 'react'
import { Button } from 'reactstrap';

export default function SingleTodo({todo, handleDelete, handlComplete}) {
    return (
        <>
             <span style={{textDecoration:todo.isCompleted ? ('line-through') : ('')}}>{todo.name}</span>
             <Button
                className="float-right"
                color="success"
                size="sm"
                onClick={() => handlComplete(todo._id)}
            > 
             Complete
            </Button>
            <Button
                className="remove-btn float-right"
                color="danger"
                size="sm"
                onClick={() => handleDelete(todo._id)}
            > 
             &times;
            </Button>
           
            
        </>
    )
}

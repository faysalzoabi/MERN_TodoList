import React, {useState, useEffect} from 'react';
import { Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Input} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SingleTodo from '../SingleTodo/SingleTodo';
import {connect} from 'react-redux';
import {getTodos, addTodo, deleteTodo, completeTodo} from '../../actions/todoActions';


const TodoList = ({todos, dispatch, isAuthenticated}) => {
   
    const [value, setValue] = useState('');
    
    useEffect(()=>{
        dispatch(getTodos())
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

       const newTodo = {
           name:value,
           isCompleted:false
       }

       dispatch(addTodo(newTodo));
    }


    const handlComplete = (id) => {
        dispatch(completeTodo(id))
    }

    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
    }  

    return (
        <Container>
            {isAuthenticated ? (
                <>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input type="text" value={value} onChange={handleChange} placeholder="Enter your todo..." />
                    </FormGroup>
                    <Button
                    color="dark"
                    style={{marginBottom:'2rem'}}
                    >
                    Add Item
                    </Button>
                </Form>
                <ListGroup>
                <TransitionGroup className="todo-list">
                    {todos.map(todo => (
                        <CSSTransition key={todo._id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <SingleTodo todo={todo} handleDelete={handleDelete} handlComplete={handlComplete}/>
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                </ListGroup>
                </>
            ) : (
                <h4 className="mb-3 ml-4"> Please log in to manage todo items</h4>
            )}
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos,
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(TodoList);

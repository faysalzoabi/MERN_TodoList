import {GET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, TODOS_LOADING} from './types';
import axios from 'axios';
import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

const fetchTodos = (todos) => {
    return {
        type:GET_TODOS,
        payload:todos
    }
}

export const addingTodo = todo => {
    return {
        type:ADD_TODO,
        payload:todo
    }
}

const updatingTodo = updatedTodo => {
    console.log('in action', updatedTodo)
    return {
        type:UPDATE_TODO,
        payload: updatedTodo
    }
}

export const deletingTodo = id => {
    console.log('id', id)
    return {
        type:DELETE_TODO,
        payload:id
    }
};

export const setTodosLoading = () => {
    return {
        type:TODOS_LOADING
    }
}

//fetch all todos
export const getTodos = () => dispatch => {
    dispatch(setTodosLoading());
    axios
        .get('/api/items')
        .then(res => dispatch(fetchTodos(res.data)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//create new todo
export const addTodo = (todo) => (dispatch, getState) => {
    axios
        .post('/api/items', todo, tokenConfig(getState))
        .then(res => dispatch(addingTodo(res.data)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


// toggle completion of todo
export const completeTodo = id => dispatch => {
    axios
        .patch(`/api/items/${id}`)
        .then(res => {
            dispatch(updatingTodo(res.data))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


//delete todo
export const deleteTodo = id => (dispatch, getState) => {
    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res => {
            if(res.data.message === 'Item Deleted')
                dispatch(deletingTodo(id));
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}
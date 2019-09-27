import {GET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, TODOS_LOADING} from '../actions/types';

const initialState = {
    todos:[],
    todosLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos:action.payload,
                todosLoading:false
            }
        
        case ADD_TODO:
            return {
                ...state,
                todos:[...state.todos, action.payload]
            }

        case UPDATE_TODO:
            console.log('in reducer upated :', action.payload);
            const todoIndex = state.todos.findIndex(todo => todo._id === action.payload._id)
            let clonedTodos = [...state.todos];
            clonedTodos[todoIndex] = action.payload;
            return {
                ...state,
                todos:clonedTodos
            }

        case DELETE_TODO:
            return {
                ...state,
                todos:state.todos.filter(todo => todo._id !== action.payload)
            }
        case TODOS_LOADING:
            return {
                ...state,
                todosLoading:true
            }
        
        default:
            return state
    }
}
import axios from 'axios';
import {returnErrors} from './errorActions';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';


//Login User
export const login = ({email,password}) => dispatch => {
    const config = {
        headers: {
            'Content-type':'application/json'
        }
    }

    const body = JSON.stringify({email, password})
    console.log('body', body);
    axios.post('/api/users/login', body, config)
         .then( res => dispatch({
             type:LOGIN_SUCCESS,
             payload:res.data
         }))
         .catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
             dispatch({
                 type:LOGIN_FAIL
             })
         })
}



//Logout User

export const doLogout = () => { 
    return {
        type: LOGOUT_SUCCESS
    }
    
}



//Register User

export const register = ({name, email, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({name, email , password});

    axios.post('/api/users/signup', body, config)
         .then(res => dispatch({
             type:REGISTER_SUCCESS,
             payload:res.data
         }))
         .catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
             dispatch({
                 type:REGISTER_FAIL
             })
         })
}

//setup config/header and token
export const tokenConfig = getState => {
    const token = getState().auth.token;
    console.log('in auth', token)
    const config = {
        headers: {
            'Content-type':'application/json'
        }
    };

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log('configgg', config)
    return config;
}


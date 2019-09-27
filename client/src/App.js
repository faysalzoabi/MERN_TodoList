import React from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar/AppNavbar';
import TodoList from './components/TodoList/TodoList';
import {Provider} from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <TodoList/>
      </div>
    </Provider>
  );
}

export default App;

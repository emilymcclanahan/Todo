import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ToDo List</h1>
        <ul>
          <NewTodo />
          <Todo />
        </ul>
      </div>
    );
  }
}

export default App;

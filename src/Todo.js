import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
      <li id="todoData" className="todo">
        <button className="check"><i className="fas fa-check-circle"></i></button>
        <p>Do this</p>
        <button className="deleteTodo"></button>
        <i ClassName="fas fa-trash-alt"></i>
      </li>
    );
  }
}

export default Todo;

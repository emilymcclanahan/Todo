import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  // completeTodo(event) {
  //   this.completeTodo() {}
  // }
  render() {
    return (
      <li className="todo">
        <button className="check" onClick={this.props.completed}><i className="fas fa-check-circle"></i></button>
        <p>{this.props.text}</p>
        <button className="delete" onClick={this.props.deleted}></button>
        <i className="fas fa-trash-alt"></i>
      </li>
    );
  }
}

export default Todo;

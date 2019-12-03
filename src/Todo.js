import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  // completeTodo(event) {
  //   this.completeTodo() {} = completeTodo.todoId;
  // }

  render() {
    var className = "todo";
    if (this.props.completed) {
      className = "completed";
    }
    return (
      <li id={this.props.id} className={className}>
        <button className="check" onClick={this.props.completeTodo}><i className="fas fa-check-circle"></i></button>
        <p>{this.props.text}</p>
        <button className="delete" onClick={this.props.deleteTodo}></button>
        <i className="fas fa-trash-alt"></i>
      </li>
    );
  }
}

export default Todo;

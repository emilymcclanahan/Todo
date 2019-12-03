import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div id="todos">
        <form id="form">
          <input id="textInput" type="text" placeholder="Click to add ToDo" />
          <button onClick={this.props.renderTodo}><i className="fas fa-plus-circle"></i></button>
          <button onClick={this.props.sortTodos}><i className="fas fa-sort"></i></button>
        </form>
      </div>
    );
  }
}

export default NewTodo;

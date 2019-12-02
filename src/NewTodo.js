import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div id="todos">
        <form id="form">
          <input id="textInput" type="text" placeholder="Click to add ToDo" />
          <button><i class="fas fa-plus-circle"></i></button>
        </form>
      </div>
    );
  }
}

export default NewTodo;

import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div id="todos">
        <form id="form">
          <input onChange={this.props.onChange} value={this.props.input} id="textInput" type="text" placeholder="Click to add ToDo" />
          <button onClick={this.props.renderTodo}><i className="fas fa-plus-circle"></i></button>
        </form>
      </div>
    );
  }
}

export default NewTodo;

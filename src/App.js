import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  constructor() {
    super()
    this.state = {todos:[], input:''}
    this.renderTodo = this.renderTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.sortTodos = this.sortTodos.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({input: event.target.value});
  }
  componentDidMount() {
  const self = this;
  var listRequest = new XMLHttpRequest();
  listRequest.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      var todos = JSON.parse(this.responseText);
      console.log(todos);
      self.setState({todos: todos});
    }
    else if(this.readyState === 4) {
      console.log(this.responseText);
    }
  }
  listRequest.open("GET", "https://cse204.work/todos", true);
  listRequest.setRequestHeader("x-api-key", "ae8aff-365e6b-bdef44-3bde7a-c9c92d");
  listRequest.send();
}
renderTodo(event) {
  event.preventDefault();
  const self = this;
  var data = {
    text: document.getElementById("textInput").value
  };
  var createRequest = new XMLHttpRequest();
  createRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var todo = (JSON.parse(this.responseText));
        self.setState({todos: [...self.state.todos, JSON.parse(this.responseText)]})
        self.setState({input: ''});
    }
    else if (this.readyState === 4) {
      console.log(this.responseText);
    }
  };
  createRequest.open("POST", "https://cse204.work/todos", true);
  createRequest.setRequestHeader("Content-type", "application/json");
  createRequest.setRequestHeader("x-api-key", "ae8aff-365e6b-bdef44-3bde7a-c9c92d");
  createRequest.send(JSON.stringify(data));
}
completeTodo(event) {
  var todoId = event.target.parentNode.id;
  const self = this;
  var data = {
    completed: true
  };
  var complete = event.target.parentNode;
  var completeRequest = new XMLHttpRequest();
  completeRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      self.setState({completed:true});
    }
    else if(this.readyState === 4){
      console.log(this.responseText);
    }
  };
  completeRequest.open("PUT", "https://cse204.work/todos/" + todoId, true);
  completeRequest.setRequestHeader("Content-type", "application/json");
  completeRequest.setRequestHeader("x-api-key", "ae8aff-365e6b-bdef44-3bde7a-c9c92d");
  completeRequest.send(JSON.stringify(data));
}
sortTodos(event) {
  const todos = this.state.todos;
  todos.sort(function (a, b) {
    return a.text.localeCompare(b.text);
  })
  this.setState({todos: todos});
}
deleteTodo(event) {
  var todoId = event.target.parentNode.id;
  var self = this;
  var deleteRequest = new XMLHttpRequest();
  deleteRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const remainingTodos = self.state.todos.filter((todo) => {
            if (todo.id !== todoId) {
              return todo;
            }
          });
          self.setState({
            todos: remainingTodos
          });
        }
        else if (this.readyState === 4) {
          console.log(this.responseText);
        }
      };
      deleteRequest.open("DELETE", "https://cse204.work/todos/" + todoId, true);
      deleteRequest.setRequestHeader("Content-type", "application/json");
      deleteRequest.setRequestHeader("x-api-key", "ae8aff-365e6b-bdef44-3bde7a-c9c92d");
      deleteRequest.send();
    }
  render() {
    return (
      <div className="App">
        <h1>ToDo List</h1>
        <ul>
          <NewTodo renderTodo={this.renderTodo} onChange={this.onChange} input={this.state.input}/>
          <button id="sortButton" onClick={this.sortTodos}><i className="fas fa-sort"></i></button>
          {this.state.todos.map((todo)=>
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            created={todo.created}
            completeTodo={this.completeTodo}
            deleteTodo={this.deleteTodo}
          />)}
        </ul>
      </div>
    );
  }
}

export default App;

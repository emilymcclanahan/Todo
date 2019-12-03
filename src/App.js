import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  constructor() {
    super()
    this.state = {todos:[]}
    this.renderTodo = this.renderTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.sortTodos = this.sortTodos.bind(this);
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
        self.setState({todos: [...self.state.todos, JSON.parse(this.responseText)]});
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
      console.log('deleteTodo if statement');
      self.setState({completed:true});
      event.target.parentNode.className = "completed";
    }
    else if(this.readyState === 4){
      console.log(this.responseText)
      console.log('completeTodo else if statement');
      console.log(todoId);
    }
  };
  completeRequest.open("PUT", "https://cse204.work/todos/" + todoId, true);
  completeRequest.setRequestHeader("Content-type", "application/json");
  completeRequest.setRequestHeader("x-api-key", "ae8aff-365e6b-bdef44-3bde7a-c9c92d");
  completeRequest.send(JSON.stringify(data));
}
sortTodos(event) {
  var todos = this.state.todos;
  todos.sort(function (a, b) {
    return a.text.localeCompare(b.text);
  })
  this.setState({todos: todos});
}

    // document.getElementById("form").addEventListener("submit", function(event) {
    //     event.preventDefault();
    //   var data = {
    //     text: textInput.value
    //   }
    //   var createRequest = new XMLHttpRequest();
    //   createRequest.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         renderTodo(JSON.parse(this.responseText));
    //     }
    //     else if (this.readyState == 4) {
    //       console.log(this.responseText);
    //     }
    //   };
    //   createRequest.open("POST", "https://cse204.work/todos", true);
    //   createRequest.setRequestHeader("Content-type", "application/json");
    //   createRequest.setRequestHeader("x-api-key", ae8aff-365e6b-bdef44-3bde7a-c9c92d);
    //   createRequest.send(JSON.stringify(data));
    // });
    // function renderTodo(todoData) {
    //   var todo = document.createElement("li");
    //   todo.setAttribute("id", todoData.id);
    //   todo.classList.add("todo");
    //   if (todoData.completed){
    //    todo.classList.add("completed");
    //   }
    //   var completeButton = document.createElement("button");
    //   completeButton.classList.add("check");
    //   completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    //   completeButton.addEventListener("click", completeTodo);
    //   var todoText = document.createElement("p");
    //   todoText.innerText = todoData.text;
    //   var deleteButton = document.createElement("button");
    //   deleteButton.classList.add("delete");
    //   var trash = document.createElement("i");
    //   trash.className = "fas fa-trash-alt";
    //   deleteButton.addEventListener("click", deleteTodo);
    //   todo.appendChild(completeButton);
    //   todo.appendChild(todoText);
    //   todo.appendChild(deleteButton);
    //   todo.appendChild(trash);
    //   document.getElementById("todos").appendChild(todo);
    //   document.getElementById("textInput").value = "";
    // }
    // function completeTodo(event) {
    //   var todoId = event.target.parentNode.id;
    //   var data = {
    //     completed: true
    //   };
    //   var completeRequest = new XMLHttpRequest();
    //   completeRequest.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //       event.target.parentNode.classList.add("completed");
    //     }
    //     else if(this.readyState == 4){
    //       console.log(this.responseText);
    //     }
    //   }
    //   completeRequest.open("PUT", "https://cse204.work/todos/" + todoId, true);
    //   completeRequest.setRequestHeader("Content-type", "application/json");
    //   completeRequest.setRequestHeader("x-api-key", ae8aff-365e6b-bdef44-3bde7a-c9c92d);
    //   completeRequest.send(JSON.stringify(data));
    // }
    deleteTodo(event) {
      var todoId = event.target.parentNode.id;
      var self = this;
      var deleteRequest = new XMLHttpRequest();
      deleteRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          console.log('deleteTodo if statement');
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
          console.log('deleteTodo else if statement');
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
          <NewTodo renderTodo={this.renderTodo}/>
          {this.state.todos.map((todo)=>
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            created={todo.created}
            completed={this.completeTodo}
            deleted={this.deleteTodo}
          />)}
        </ul>
      </div>
    );
  }
}

export default App;

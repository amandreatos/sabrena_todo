import React, { Component } from "react";
import { fire } from "./fire";
import TodoList from "./components/TodoList";
import "./App.css";

class App extends Component {
  state = {
    todos: {},
    todoItem: ""
  };

  todosRef = fire.database().ref("todos");

  componentWillMount() {
    this.todosRef.on("value", data => {
      this.setState({
        todos: data.val()
      });
    });
  }

  componentWillUnmount() {
    fire.removeBinding(this.todosRef);
  }

  addItem = e => {
    e.preventDefault();
    this.todosRef.push({
      item: this.state.todoItem,
      completed: false
    });
  };

  completeItem = id => {
    this.todosRef.update({
      [id]: {
        ...this.state.todos[id],
        completed: true
      }
    });
  };

  deleteItem = id => {
    let { [id]: deleted, ...todos } = this.state.todos;
    this.setState({ todos });
  };

  render() {
    return (
      <div className="App">
        <h3>Add New Item</h3>
        <form onSubmit={this.addItem}>
          <div class="input-field-container inline">
            <input
              id="textFieldOne"
              placeholder="What do you need to do?"
              type="text"
              class="text-field"
              onChange={e => {
                this.setState({ todoItem: e.target.value });
              }}
            />
            <button class="button input-button">Submit</button>
          </div>
        </form>
        <div className="allTodos">
          <TodoList
            items={this.state.todos}
            action={this.deleteItem}
            done={true}
          />
          <TodoList
            items={this.state.todos}
            action={this.completeItem}
            done={false}
          />
        </div>
      </div>
    );
  }
}

export default App;

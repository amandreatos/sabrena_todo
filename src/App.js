import React, { Component } from "react";
import { fire, auth } from "./fire";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import ReactNotification from "react-notifications-component";
import "./App.css";

class App extends Component {
  state = {
    todos: {},
    todoItem: "",
    showComplete: false,
    loading: true,
    isAuth: false,
    error: null,
    uid: "uf8cEulfF5RSGr7uB1FHGQYS8c53",
    adminUid: "QygHXitghpPy1eiPChtJ1yOcQMy2"
  };

  todosRef = fire.database().ref("todos");

  componentWillMount() {
    this.todosRef.on("value", data => {
      this.setState({
        todos: data.val(),
        loading: false
      });
    });
    this.checkAuth();
  }

  componentDidMount() {
    this.doGreeting();
  }

  componentWillUnmount() {
    fire.removeBinding(this.todosRef);
  }

  checkAuth = () => {
    const storedUid = localStorage.getItem("uid");
    if (this.state.uid === storedUid || this.state.adminUid === storedUid) {
      this.setState({ isAuth: true });
    }
  };

  handleLogin = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.setState({ isAuth: true });
        localStorage.setItem("uid", response.user.uid);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: "Whoops! Wrong Password" });
      });
  };

  addItem = e => {
    e.preventDefault();
    this.todosRef.push({
      item: this.state.todoItem,
      completed: false
    });
    this.setState({ todoItem: "" });
    this.addNotification("Todo Added", "Yeah! Lets do this!! 😎", "success");
  };

  toggleItem = id => {
    if (this.state.todos[id].completed === true) {
      console.log(this.state.todos[id]);
      this.todosRef.update({
        [id]: {
          ...this.state.todos[id],
          completed: false
        }
      });
    } else if (this.state.todos[id].completed === false) {
      this.todosRef.update({
        [id]: {
          ...this.state.todos[id],
          completed: true
        }
      });
      this.addNotification("Todo Complete", "Woooo! Keep it up!! 😁", "success");
    }
  };

  handleConfirm = () => {
    this.setState({didConfirm: true});
  }

  deleteItem = id => {
    this.todosRef.child(id).remove();
    let { [id]: deleted, ...todos } = this.state.todos;
    this.setState({ todos });
    this.addNotification("Item Deleted", "Let's hope that was a typo! 🤔", "danger");
  };

  doGreeting = () => {
    if (this.state.isAuth) {
      this.addNotification(null, "Welcome back baby 😘", "default");
    }
  }

  addNotification = (title, message, type) => {
    this.notificationDOMRef.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "bounceOut"],
      dismiss: { duration: 4000 },
      dismissable: { click: true }
    });
  }

  render() {
    let currentView = (
      <Login handleLogin={this.handleLogin} error={this.state.error} />
    );
    if (this.state.isAuth) {
      currentView = (
        <div className="Todo">
          <div className="todoInput">
            <form onSubmit={this.addItem}>
              <div className="input-field-container inline">
                <input
                  id="textFieldOne"
                  placeholder="What else do you need to do!"
                  type="text"
                  value={this.state.todoItem}
                  className="text-field"
                  onChange={e => {
                    this.setState({ todoItem: e.target.value });
                  }}
                />
                <button className="button input-button">Add!</button>
              </div>
            </form>
          </div>
          <button
            onClick={() =>
              this.setState({ showComplete: !this.state.showComplete })
            }
            className="button"
          >
            {this.state.showComplete ? (
              <span className="i-right">
                Show Outstanding Todos
              </span>
            ) : (
              <span className="i-right">
                Show Completed Todos
              </span>
            )}
          </button>
          {this.state.todos ? (
            <div className="allTodos">
            <TodoList
              items={this.state.todos}
              isLoading={this.state.loading}
              deleteItem={this.deleteItem}
              action={this.toggleItem}
              done={this.state.showComplete}
            />
          </div>
          ) : (
            <p>Add a new todo</p>
          )}
        </div>
      );
    }
    return (
      <div className="App">
      <ReactNotification ref={input => this.notificationDOMRef = input} />
        <header className="Header">
          <h1 className="sabrena">Sabrena's Todo List</h1>
        </header>
        {currentView}
      </div>
    );
  }
}

export default App;

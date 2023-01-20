import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import TodoBanner from './TodoBanner';
import TodoCreator from './TodoCreator';
import TodoRows from './TodoRows';
import { VisibilityControl } from './VisibilityControl';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Hamza",
      todoItems: [
        { action: "Buy Flowers", done: false },
        { action: "Get Shoes", done: false },
        { action: "Collect Tickets", done: true },
        { action: "Call Joe", done: false }
      ],
      showCompleted: true
    }
  }
  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Hamza" ? "Hatim" : "Hamza"
    })
  }

  updateNewTextValue = (event) => {
    this.setState({
      newItemText: event.target.value
    })

  }  /* this function set a value in the input fields using onChange event */

  createNewTodo = (task) => {
    if (!this.state.todoItems.find(item => item.action === task)) {
      this.setState({
        todoItems: [...this.state.todoItems, { action: task, done: false }]
      }, () => localStorage.setItem("todos", JSON.stringify(this.state)));
    }
  }  /* this function create a new action with a done false */
  /* we used localStorage to locally store the values in LOCAL API */

  toggleTodo = (todo) => this.setState({
    todoItems:
      this.state.todoItems.map(item => item.action === todo.action
        ? { ...item, done: !item.done } : item)
  }); /* this function changes state of done value from false to true and vice-versa */

  todoTableRows = (doneValue) => this.state.todoItems
    .filter(item => item.done === doneValue).map(item =>
      <TodoRows key={item.action} item={item}
        callback={this.toggleTodo} />) /* this function maps over the todo action and done value in a table */

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null
      ? JSON.parse(data)
      : {
        userName: "Hamza",
        todoItems: [{ action: "Buy Flowers", done: false },
        { action: "Get Shoes", done: false },
        { action: "Collect Tickets", done: true },
        { action: "Call Joe", done: false }],
        showCompleted: true
      });
  }
  render() {
    return (
      <div>
        <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
        <div className="container-fluid">
          <TodoCreator callback={this.createNewTodo} />
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>{this.todoTableRows(false)}</tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed Tasks"
              isChecked={this.state.showCompleted}
              callback={(checked) =>
                this.setState({ showCompleted: checked })} />
          </div>
          {this.state.showCompleted &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr><th>Description</th><th>Done</th></tr>
              </thead>
              <tbody>{this.todoTableRows(true)}</tbody>
            </table>
          }
        </div>
      </div>

    )
  };
}



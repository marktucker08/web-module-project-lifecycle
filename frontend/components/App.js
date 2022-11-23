import React from 'react'
import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoData: []
    }
  }

  componentDidMount() {
    console.log("component did mount!")
      fetch(URL)
      .then((res) => res.json())
      .then((todo) => this.setState({todoData: todo.data}) )
      .catch((err) => console.log('nooooo'));
  }

  addTodo = (e, item) => {
    e.preventDefault();
    const newTodo = {
      name: item,
      id: Date.now(),
      completed: false
    }
    this.setState({...this.state, todoData: [...this.state.todoData, newTodo]}); 
  }

  toggleTodo = itemId => {
    this.setState({...this.state, todoData: this.state.todoData.map(item => {
      if (item.id === itemId) {
        return {...item, completed: !item.completed}
      }
      return item;
    })})
  }

  clearTodos = () => {
    this.setState({...this.state, todoData: this.state.todoData.filter(item => {
      if (!item.completed) return item;
    })})
  }

  render() {
    console.log(this.state.todoData);
    return (
      <>
      <div>
        <Form addTodo={this.addTodo} />
      </div>
      
      <div>
        <h2>Todo List:</h2>
        <TodoList toggleTodo={this.toggleTodo} todoData={this.state.todoData} />
        <button onClick={this.clearTodos} className="clear-btn">Clear Completed</button>
      </div>
      </>
    )
  }
}

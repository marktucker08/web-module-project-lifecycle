import React from 'react'
import Form from './Form';
import TodoList from './TodoList';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoData: []
    }
  }

  fetchTodos = () => {
    axios.get(URL)
      .then((res) => this.setState({todoData: res.data.data}) )
      .catch((err) => console.log('nooooo'));
  }
  
  componentDidMount() {
    console.log("component did mount!")
      this.fetchTodos();
  }

  addTodo = (e, item) => {
    e.preventDefault();
    axios.post(URL,{ name: item })
      .then((res) => {
        console.log(res)
        this.setState({...this.state, todoData: this.state.todoData.concat(res.data.data)}); 
      })
      .catch(err => {
        console.log(err)
      })
  }

  toggleTodo = itemId => {
    axios.patch(`${URL}/${itemId}`)
      .then(res => {
        this.setState({...this.state, todoData: this.state.todoData.map(item => {
          if (item.id === itemId) {
            return res.data.data
          }
          return item;
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
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

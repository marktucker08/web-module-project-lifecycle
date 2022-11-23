import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ''
    }
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({...this.state, item: e.target.value})
  };

  submitForm = e => {
    e.preventDefault();
    this.props.addTodo(e, this.state.item);
    this.setState({...this.state, item: ''})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <input type="text" name="todo" value={this.state.item} onChange={this.handleChange}/>
          <button>Add Todo</button>
        </form>
      </div>
    )
  }
}

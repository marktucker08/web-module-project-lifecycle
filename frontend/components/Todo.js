import React from 'react'

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div onClick={() => this.props.toggleTodo(this.props.item.id)}>
        <p>{this.props.item.name} {this.props.item.completed ? "X" : ""}</p>
      </div>
    )
  }
}

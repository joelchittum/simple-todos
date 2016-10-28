import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js'; 

// Task component - represents a single todo item

export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <li className={taskClassName}>
        
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

        <table border="1">
          <tr>
            <td>{this.props.task.title}</td>
            <td>{this.props.task.url}</td>
            <td>{this.props.task.createdAt}</td>
            <td>{this.props.task.description}</td>
          </tr>
          &times;
        </table>
      </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  title: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired
};
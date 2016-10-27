import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';

// App component - represents the whole app

class App extends Component {
	renderTasks() {
		return this.props.tasks.map((task) => (
			<Task key={task._id} task={task}/>
		));
		return this.props.tasks.map((aname) => (
			<Task key={task._id} task={task}/>
		));
		return this.props.tasks.map((avalue) => (
			<Task key={task._id} task={task}/>
		));
		return this.props.tasks.map((createdAt) => (
			<Task key={task._id} task={task}/>
		));
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>Interview App</h1>
				</header>
				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
}

App.propTypes = {
	tasks: PropTypes.array.isRequired
};



export default createContainer(() => {
	return {
		tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
	};
}, App);

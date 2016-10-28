import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';

// App component - represents the whole app

class App extends Component {
	handleSubmit(event) {
		event.preventDefault();

		var titleinput = ReactDOM.findDOMNode(this.refs.title).value;
		var urlinput = ReactDOM.findDOMNode(this.refs.url).value;
		var descriptioninput = ReactDOM.findDOMNode(this.refs.description).value;

		//Validation check for url only valid for .com, .net, and .edu
		var urlhttpa = urlinput.substr(0, 10);
		var urlhttpb = urlinput.substr(0, 11);
		var urlcom = urlinput.substr(urlinput.length-3, urlinput.length);

		//First validation check is for the formulation of the http part of the URL
		if(urlhttpa == "http://www" || urlhttpb == "https://www")
		{
			//Next validate the web address termination
			if(urlcom == "com" || urlcom == "edu" || urlcom == "net")
			{
				//Require entry in the title and the description
				if(titleinput.length == 0)
				{
					ReactDOM.findDOMNode(this.refs.url).value = "No Title";
				}
				else if(descriptioninput.length == 0)
				{
					ReactDOM.findDOMNode(this.refs.description).value = "No description";
				}
				else
				{
					Tasks.insert({
						title: titleinput,
      					createdAt: new Date().toString(), // creation time UTC
      					url: urlinput,
      					description: descriptioninput
    				});
				}
			}
			else
			{
				ReactDOM.findDOMNode(this.refs.url).value = 'Malformed url try again';
			}
		}
		else
		{
			ReactDOM.findDOMNode(this.refs.url).value = 'Malformed url try again';
		}

    	// Clear form
    	ReactDOM.findDOMNode(this.refs.title).value = '';
    	ReactDOM.findDOMNode(this.refs.url).value = '';
    	ReactDOM.findDOMNode(this.refs.description).value = '';
  	}

	renderTasks() {
		return this.props.tasks.map((task) => (
			<Task key={task._id} task={task}/>
		));
		return this.props.tasks.map((url) => (
			<Task key={task._id} task={task}/>
		));
		return this.props.tasks.map((description) => (
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
					<form className="submit" onSubmit={this.handleSubmit.bind(this)} >
            		<input
              			type="text"
              			ref="title"
              			placeholder="Type a Title"
        			/>
        			
        			<input
        				type="URL"
        				ref="url"
        				placeholder="Enter URL"
        			/>
        			
        			<input
        				type="text"
        				ref="description"
        				placeholder="Enter description"
        			/>

        			<button class="submit">Submit Record</button>

          			</form>
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

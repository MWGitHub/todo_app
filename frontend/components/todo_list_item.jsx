var React = require('react');

var TodoListItem = React.createClass({

	handleDestroy: function (e) {
		this.props.onDestroy(this.props.todo.id);
	},

	render: function () {
		return (
			<div>
				<div><h2>{this.props.todo.title}</h2></div>
				<div><p>{this.props.todo.body}</p></div>
				<div>
					<button onClick={this.handleDestroy}>Delete this Todo</button>
				</div>
			</div>
		);
	}
});

module.exports = TodoListItem;

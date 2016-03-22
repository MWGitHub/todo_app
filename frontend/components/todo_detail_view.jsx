var React = require('react');

var TodoDetailView = React.createClass({

	handleDestroy: function (e) {
		this.props.onDestroy(this.props.todo.id);
	},

	render: function () {
		return (
			<div>
				<div><p>{this.props.todo.body}</p></div>
				<button onClick={this.handleDestroy}>Delete this Todo</button>
			</div>
		);
	}
});


module.exports = TodoDetailView;

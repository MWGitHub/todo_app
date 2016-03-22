var React = require('react');
var DoneButton = require('./done_button');
var TodoDetailView = require('./todo_detail_view');

var TodoListItem = React.createClass({
	getInitialState: function () {
		return { isVisible: false };
	},

	handleClick: function () {
		this.setState({ isVisible: !this.state.isVisible });
	},

	render: function () {
		var detailView = "";
		if (this.state.isVisible) {
			detailView = (<TodoDetailView
				todo={this.props.todo}
				onDestroy={this.props.onDestroy}
				/>);
		}

		return (
			<div>
				<div onClick={this.handleClick}>
					<h2>{this.props.todo.title}</h2>
				</div>
				{detailView}
				<DoneButton
					buttonId={this.props.todo.id}
					done={this.props.todo.done}
					doneClick={this.props.doneClick}
					/>
				<div>
				</div>
			</div>
		);
	}
});

module.exports = TodoListItem;

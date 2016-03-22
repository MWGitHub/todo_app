var React = require('react');

var DoneButton = React.createClass({
	handleDone: function () {
		this.props.doneClick(this.props.buttonId);
	},

	render: function () {
		var status = this.props.done ? 'Undo' : 'Done';

		return (
			<button onClick={this.handleDone}>{status}</button>
		);
	}
});

module.exports = DoneButton;

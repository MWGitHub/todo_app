var React = require('react');

var TodoForm = React.createClass({
	getInitialState: function () {
		return {
			title: '',
			body: ''
		};
	},

	updateTitle: function (e) {
		this.setState({ title: e.target.value });
	},

	updateBody: function (e) {
		this.setState({ body: e.target.value });
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var todoObj = {
			title: this.state.title,
			body: this.state.body
		};

		this.props.onSubmit(todoObj);
		this.setState({title: '', body: ''});
	},

	render: function () {
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Make a New ToDo</h2>
				<p>
					<label>Title
						<input type="text" value={this.state.title}
							onChange={this.updateTitle} />
					</label>
				</p>
				<p>
					<label>Body
						<textarea value={this.state.body}
							onChange={this.updateBody}></textarea>
					</label>
				</p>
				<p>
					<input type="submit" value="Create ToDoList Item"/>
				</p>
			</form>
		);
	}
});

module.exports = TodoForm;

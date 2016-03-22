var React = require('react');
var TodoStore = require('../stores/todo_store');
var TodoListItem = require('./todo_list_item');
var TodoForm = require('./todo_form');


var TodoList = React.createClass({

	getInitialState: function () {
		return { todos: TodoStore.all() };
	},

	todosChanged: function () {
		this.setState({ todos: TodoStore.all() });
	},

	createTodo: function (todoObj) {
		TodoStore.create(todoObj);
	},

	deleteTodo: function (id) {
		TodoStore.destroy(id);
	},

	componentDidMount: function () {
		TodoStore.addChangedHandler(this.todosChanged);
		TodoStore.fetch();
	},

	componentWillUnmount: function () {
		TodoStore.removeChangedHandler(this.todosChanged);
	},

	render: function () {
		var self = this;
		var todos = this.state.todos.map(function (todo) {
			return (
				<TodoListItem key={"todo-" + todo.id}
					todo={todo} onDestroy={self.deleteTodo} />
			);
		});

		return (
			<div>
				<TodoForm onSubmit={this.createTodo} />
				{todos}
			</div>
		);
	}

});

module.exports = TodoList;

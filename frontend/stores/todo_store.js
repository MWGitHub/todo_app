var _todos = {};
var _callbacks = [];


var TodoStore = {

	addChangedHandler: function (callback) {
		if (_callbacks.indexOf(callback) === -1) _callbacks.push(callback);
	},

	removeChangedHandler: function (callback) {
		var index = _callbacks.indexOf(callback);
		if (index !== -1) {
			_callbacks.splice(index, 1);
		}
	},


	changed: function () {
		_callbacks.forEach(function (cb) {
			cb();
		});
	},

	all: function () {
		var result = [];
		for (var key in _todos) {
			if (!_todos.hasOwnProperty(key)) continue;
			result.push(_todos[key]);
		}

		return result;
	},

	fetch: function () {
		$.ajax({
			url: '/api/todos',
			type: "GET",
			dataType: "json",
			success: function (data) {
				_todos = {};
				for (var i = 0; i < data.length; i++) {
					_todos[data[i].id] = data[i];
				}
				TodoStore.changed();
			},
			error: function () {
				console.log('There was an error in fetching todos');
			}
		});
	},

	create: function (todo) {
		$.ajax({
			url: '/api/todos',
			type: "POST",
			dataType: "json",
			data: {
				todo: todo
			},
			success: function (data) {
				_todos[data.id] = data;
				TodoStore.changed();
			},
			error: function () {
				console.log('There was an error in creating a todo');
			}
		});
	},

	destroy: function (id) {
		if (_todos[id]) {
			$.ajax({
				url: '/api/todos/' + id,
				type: "DELETE",
				dataType: "json",
				success: function (data) {
					delete _todos[id];
					TodoStore.changed();
				},
				error: function () {
					console.log('There was an error in destroying a todo');
				}
			});
		}
	},

	toggleDone: function (id) {
		if (!_todos[id]) return;

		var doneState = _todos[id].done;
		$.ajax({
			url: '/api/todos/' + id,
			type: "PATCH",
			dataType: "json",
			data: {
				todo: {
					done: !doneState
				}
			},
			success: function (data) {
				_todos[data.id] = data;
				TodoStore.changed();
			},
			error: function () {
				console.log('There was an error in toggling a todo');
			}
		});
	}

};




module.exports = TodoStore;

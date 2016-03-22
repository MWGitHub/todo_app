var _steps = {};
var _callbacks = [];

var StepStore = {

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

	all: function (todoId) {
		var result = [];
		var todoStep = _steps[todoId];

		for (var key in todoStep) {
			if (!todoStep.hasOwnProperty(key)) continue;
			result.push(todoStep[key]);
		}

		return result;
	},

	fetch: function (todoId) {
		$.ajax({
			url: '/api/todos/' + todoId + '/steps',
			type: "GET",
			dataType: "json",
			success: function (data) {
				_steps[todoId] = {};
				for (var i = 0; i < data.length; i++) {
					_steps[todoId][data[i].id] = data[i];
				}
				StepStore.changed();
			},
			error: function () {
				console.log('There was an error in fetching steps');
			}
		});
	},

	create: function (step) {
		$.ajax({
			url: '/api/todos/' + step.todo_id + '/steps',
			type: "POST",
			dataType: "json",
			data: {
				step: step
			},
			success: function (data) {
				_steps[data.todo_id][data.id] = data;
				StepStore.changed();
			},
			error: function () {
				console.log('There was an error in creating a step');
			}
		});
	},

	destroy: function (id) {
		$.ajax({
			url: '/api/steps/' + id,
			type: "DELETE",
			dataType: "json",
			success: function (data) {
				delete _steps[data.todo_id][data.id];
				StepStore.changed();
			},
			error: function () {
				console.log('There was an error in destroying a step');
			}
		});
	},

	toggleDone: function (id, doneState) {
		$.ajax({
			url: '/api/steps/' + id,
			type: "PATCH",
			dataType: "json",
			data: {
				step: {
					done: !doneState
				}
			},
			success: function (data) {
				// debugger;
				_steps[data.todo_id][data.id] = data;
				StepStore.changed();
			},
			error: function () {
				console.log('There was an error in toggling a step');
			}
		});

	}
};




module.exports = StepStore;

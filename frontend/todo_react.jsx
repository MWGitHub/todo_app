var React = require('react');
var ReactDOM = require('react-dom');
var TodoList = require('./components/todo_list');


window.initializeApp = function ($el) {
	$(function () {
		ReactDOM.render(<TodoList />, $el[0]);
	});
};

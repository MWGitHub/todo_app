var React = require('react');
var StepStore = require('../stores/step_store');
var DoneButton = require('./done_button');
var StepForm = require('./step_form');

var Step = React.createClass({
	handleDone: function(buttonId) {
		this.props.handleDoneStep(buttonId, this.props.step.done);
	},

	handleDestroy: function () {
		this.props.onDestroy(this.props.step.id);
	},

	render: function () {
		var step = this.props.step;

		return (
			<div>
				<p>{step.step}</p>
				<DoneButton
					buttonId={step.id}
					doneClick={this.handleDone}
					done={step.done}
				/>
				<button onClick={this.handleDestroy}>Delete this Todo</button>
			</div>
		);
	}
});

var TodoDetailView = React.createClass({
	getInitialState: function () {
		return {
			steps: StepStore.all(this.props.todo.id)
		};
	},

	changed: function () {
		this.setState({
			steps: StepStore.all(this.props.todo.id)
		});
	},

	handleDoneStep: function (stepId, doneState) {
		StepStore.toggleDone(stepId, doneState);
	},

	componentDidMount: function () {
		StepStore.addChangedHandler(this.changed);
		StepStore.fetch(this.props.todo.id);
	},

	componentWillUnmount: function () {
		StepStore.removeChangedHandler(this.changed);
	},

	handleDestroy: function (e) {
		this.props.onDestroy(this.props.todo.id);
	},

	handleStepDestroy: function (stepId) {
		StepStore.destroy(stepId);
	},

	handleStepSubmit: function (stepObj) {
		stepObj.todo_id = this.props.todo.id;
		StepStore.create(stepObj);
	},

	render: function () {
		var self = this;
		var steps = this.state.steps.map(function (step) {
			return (
				<Step
					key={'step-' + step.id}
					step={step}
					onDestroy={self.handleStepDestroy}
					handleDoneStep={self.handleDoneStep}
				/>
			);
		});

		return (
			<div>
				<div><p>{this.props.todo.body}</p></div>
				<StepForm onSubmit={this.handleStepSubmit}/>
				{steps}
				<button onClick={this.handleDestroy}>Delete this Todo</button>
			</div>
		);
	}
});


module.exports = TodoDetailView;

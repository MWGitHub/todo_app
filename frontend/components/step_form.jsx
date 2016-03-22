var React = require('react');

var StepForm = React.createClass({
	getInitialState: function () {
		return {
			step: ''
		};
	},

	updateStep: function (e) {
		this.setState({ step: e.target.value });
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var stepObj = {
			step: this.state.step
		};

		this.props.onSubmit(stepObj);
		this.setState( {step: ''} );
	},

	render: function () {
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Make a New Step</h2>
				<p>
					<label>Step
						<textarea value={this.state.step}
							onChange={this.updateStep}></textarea>
					</label>
				</p>
				<p>
					<input type="submit" value="Create Step Item"/>
				</p>
			</form>
		);
	}
});

module.exports = StepForm;

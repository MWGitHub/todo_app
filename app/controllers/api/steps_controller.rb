class Api::StepsController < ApplicationController
	def index
		todo = Todo.find(params[:todo_id])
		@steps = todo.steps
	end

	def create
		todo = Todo.find(params[:todo_id])

		@step = todo.steps.create!(step_params)
		render :show
	end

	def destroy
		@step = Step.find(params[:id])
		@step.destroy!
		render :show
	end

	def update
		@step = Step.find(params[:id])
		@step.update!(step_params)
		render :show
	end

	private
	def step_params
		params.require(:step).permit(:step, :done)
	end
end

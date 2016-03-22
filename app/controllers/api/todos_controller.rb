class Api::TodosController < ApplicationController
	def index
		@todos = Todo.all
	end

	def show
		@todo = Todo.find(params[:id])
	end

	def create
		@todo = Todo.create!(todo_params)
		render :show
	end

	def destroy
		@todo = Todo.find(params[:id])
		@todo.destroy!
		render :index
	end

	def update
		@todo = Todo.find(params[:id])
		@todo.update!(todo_params)
		render :show
	end

	private
	def todo_params
		params.require(:todo).permit(:title, :body, :done)
	end
end

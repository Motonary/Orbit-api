class Api::AssignmentsController < ApplicationController
  before_action :authenticate_user
  before_action :set_current_project

  def set_current_project
    @current_project = Project.find(params[:project_id])
  end

  def index
    render json: @current_project.assignments
  end

  # TODO: 破壊されたやつ一覧をfetch

  def create
    # TODO: ajax通信量を加味するとrenderするのはnew_projectだけにしてreducer側でstateにpushすべきか？
    new_assignment = @current_project.assignments.new(
      title: params[:title],
      detail: params[:detail],
      deadline: params[:deadline], # jsとrubyではdatetimeの記法が違うので注意
      planet_type: params[:type].to_i,
      planet_size: params[:size].to_i,
      orbit_pos: params[:pos].to_i
    )
    new_assignment.save and render json: @current_project.assignments
  end

  def destroy
    destroyed_assignment = Assignment.find(params[:id])
    destroyed_assignment.update_attribute(:destroyed_flag, true)
    render json: @current_project.assignments
  end
end

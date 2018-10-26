class Api::AssignmentsController < ApplicationController
  before_action :authenticate_user
  before_action :set_current_project, only: [:fetch_revolving, :create]

  def set_current_project
    @current_project = Project.find(params[:project_id])
  end

  def fetch_revolving
    render json: @current_project.assignments.where(destroyed_flag: false)
  end

  def fetch_destroyed
    # TODO: SQLの知識ないけどもう少しうまくできそう？特にmergeのところ
    render json: Assignment.joins(project: :users).merge(User.where(id: current_user)).where(destroyed_flag: true)
  end

  def create
    # TODO: strong_parameter
    new_assignment = @current_project.assignments.new(
      title: params[:title],
      detail: params[:detail],
      deadline: params[:deadline], # jsとrubyではdatetimeの記法が違うので注意
      planet_type: params[:type].to_i,
      planet_size: params[:size].to_i,
      orbit_pos: params[:pos].to_i
    )
    new_assignment.save and render json: new_assignment
  end

  def destroy
    destroyed_assignment = Assignment.find(params[:id])
    destroyed_assignment.update_attribute(:destroyed_flag, true) and head :ok
  end

  def restore
    restored_assignment = Assignment.find(params[:id])
    restored_assignment.update_attribute(:destroyed_flag, false) and head :ok
  end
end

class Api::AssignmentsController < ApplicationController
  before_action :authenticate_user

  def index
    current_project = Project.find(params[:project_id])
    render json: current_project.assignments
  end

  def create

  end

  def destroy

  end
end

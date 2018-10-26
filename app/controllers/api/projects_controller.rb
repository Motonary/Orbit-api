class Api::ProjectsController < ApplicationController
  before_action :authenticate_user

  def index
    render json: current_user.projects
  end

  def create
    # TODO: Strong_parameter
    new_project = current_user.projects.new(
      title: params[:title],fixed_star_type: params[:star_type].to_i
    )
    new_project.save and render json: new_project
  end

  def destroy
    unnecessary_project = Project.find(params[:id])
    unnecessary_project.destroy and head :ok
  end
end

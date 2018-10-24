class Api::ProjectsController < ApplicationController
  before_action :authenticate_user

  def index
    render json: current_user.projects
  end

  def create
    current_user.projects.create(title: params[:title],fixed_star_type: params[:star_type].to_i)
    render json: current_user.projects
  end

  def destroy
    unnecessary_project = Project.find(params[:id])
    unnecessary_project.destroy and render json: current_user.projects
  end
end

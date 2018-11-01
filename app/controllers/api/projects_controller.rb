class Api::ProjectsController < ApplicationController
  before_action :authenticate_user

  def index
    render json: current_user.projects
  end

  def fetch_on_bar
    render json: current_user.projects.without_id(params[:current_project_id])
  end

  def create
    new_project = current_user.projects.new(project_params)
    new_project.save! and render json: new_project
  end

  def destroy
    unnecessary_project = Project.find(params[:id])
    unnecessary_project.destroy and head :ok
  end

  private

    def project_params
        params.require(:project).permit(:title, :fixed_star_type)
    end
end

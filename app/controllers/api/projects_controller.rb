class Api::ProjectsController < ApplicationController
  before_action :authenticate_user

  def index
    current_user_projects = current_user.projects.select_for_res
    logger.debug("{'user_id' : #{current_user.id}, 'user_name' : '#{current_user.name}'}")
    logger.debug(current_user_projects.inspect)
    render json: current_user_projects
  end

  def create
    logger.debug("{'user_id' : #{current_user.id}, 'user_name' : '#{current_user.name}'}")
    logger.debug(project_params)
    new_project = current_user.projects.create!(project_params) and render json: new_project
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

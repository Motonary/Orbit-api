class Api::ProjectsController < ApplicationController
  before_action :authenticate_user

  def index
    current_user_projects = current_user.projects
    serializer = current_user_projects.each { |project| ProjectSerialzer.new(project) }
    logger.debug("{'user_id' : #{current_user.id}, 'user_name' : '#{current_user.name}'}")
    logger.debug(serializer.inspect)

    render json: serializer.serialized_json
  end

  def create
    logger.debug("{'user_id' : #{current_user.id}, 'user_name' : '#{current_user.name}'}")
    logger.debug(project_params)

    if current_user.projects.count <= 3
      new_project = current_user.projects.create!(project_params) and render json: ProjectSerialzer.new(new_project)
    else
      head :no_content # TODO: statuscode204は不適切だから変えたい
    end
  end

  def destroy
    unnecessary_project = Project.find(params[:id])
    unnecessary_project.destroy and head :ok
  end

  private
    def project_params
        params.require(:project).permit(:title, :description, :fixed_star_type)
    end
end

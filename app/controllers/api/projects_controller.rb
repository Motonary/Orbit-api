class Api::ProjectsController < ApplicationController
  before_action :authenticate_user

  def index
    render json: current_user.projects
  end

  def create
    # 数値をparameterとして渡すと自動的に文字列に変換してされるため一々assignment_params
    # を参照しなければならず、気持ち悪い。to_iをうまく排除できないだろうか？
    new_project = current_user.projects.new(
      title: project_params[:title],
      fixed_star_type: project_params[:star_type].to_i
    )
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

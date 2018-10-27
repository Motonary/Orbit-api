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
    # 数値をparameterとして渡すと自動的に文字列に変換してされるため一々assignment_params
    # を参照しなければならず、気持ち悪い。to_iをうまく排除できないだろうか？
    new_assignment = @current_project.assignments.new(
      title: assignment_params[:title],
      detail: assignment_params[:detail],
      deadline: assignment_params[:deadline], # jsとrubyではdatetimeの記法が違うので注意
      planet_type: assignment_params[:type].to_i,
      planet_size: assignment_params[:size].to_i,
      orbit_pos: assignment_params[:pos].to_i
    )
    new_assignment.save! and render json: new_assignment
  end

  def destroy
    destroyed_assignment = Assignment.find(params[:id])
    destroyed_assignment.update_attribute(:destroyed_flag, true) and head :ok
  end

  def restore
    restored_assignment = Assignment.find(params[:id])
    restored_assignment.update_attribute(:destroyed_flag, false) and head :ok
  end

  private

    def assignment_params
      params.require(:assignment).permit(:title, :detail, :deadline, :type, :size, :pos)
    end
end
